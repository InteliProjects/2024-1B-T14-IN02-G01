/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  // Método para criar um novo usuário
  create: async function (req, res) {
    try {
      // Cria um novo registro de usuário com os dados recebidos no corpo da requisição
      const user = await User.create(req.body).fetch();
      // Retorna o usuário criado com status 201 (Created)
      return res.status(201).json(user);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para buscar todos os usuários
  find: async function (req, res) {
    try {
      // Busca todos os registros na tabela User
      const users = await User.find();
      // Retorna a lista de usuários com status 200 (OK)
      return res.status(200).json(users);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para buscar um único usuário pelo ID
  findOne: async function (req, res) {
    try {
      // Busca um registro pelo ID fornecido nos parâmetros da requisição
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
        // Se não encontrar o usuário, retorna status 404 (Not Found) e uma mensagem de erro
        return res.status(404).json({ error: 'User not found' });
      }
      // Retorna o usuário encontrado com status 200 (OK)
      return res.status(200).json(user);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para atualizar um usuário pelo ID
  update: async function (req, res) {
    try {
      // Atualiza o registro pelo ID com os dados fornecidos no corpo da requisição e retorna o usuário atualizado
      const user = await User.updateOne({ id: req.params.id }).set(req.body);
      if (!user) {
        // Se não encontrar o usuário para atualizar, retorna status 404 (Not Found) e uma mensagem de erro
        return res.status(404).json({ error: 'User not found' });
      }
      // Retorna o usuário atualizado com status 200 (OK)
      return res.status(200).json(user);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para registrar um novo usuário
  register: async function (req, res) {
    try {
      const { name, email, password, role } = req.body;
      // Hash da senha do usuário antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Cria um novo usuário com a senha criptografada
      const user = await User.create({ name, email, password: hashedPassword, role }).fetch();
      //return res.status(201).json(user);
      return res.redirect('/login');

    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para login de usuário
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      // Busca o usuário pelo e-mail fornecido
      const user = await User.findOne({ email });
      if (!user) {
        // Se não encontrar o usuário, retorna status 404 (Not Found) e uma mensagem de erro
        return res.status(404).json({ error: 'User not found' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // Se a senha não coincidir, retorna status 401 (Unauthorized) e uma mensagem de erro
        return res.status(401).json({ error: 'Invalid password' });
      }
      // Store the user ID in the session
      req.session.userId = user.id;
      // Redirect to the resenha form page after successful login
      return res.redirect('/generalforms');
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para exibir a página de formulários gerais
  showGeneralForms: function (req, res) {
      // Certifique-se de que o ID do usuário está armazenado na sessão
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }
  
      // Passe o ID do usuário para a visualização
      return res.view('pages/generalForms', { userId: userId });
  },
};
