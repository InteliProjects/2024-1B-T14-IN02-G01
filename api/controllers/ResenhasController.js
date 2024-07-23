/**
 * ResenhasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Método para criar uma nova resenha
  create: async function (req, res) {
    try {
      // Obtém o ID do usuário da sessão
      const userId = req.session.useruid;
      if (!userId) {
        console.log('Usuário não autenticado');
        // Se o usuário não estiver autenticado, retorna status 401 (Unauthorized)
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      // Adiciona o ID do usuário aos dados da resenha
      const resenhaData = { ...req.body, user_id: userUid };

      // Log para verificação dos dados recebidos
      console.log('Dados recebidos para a resenha:', resenhaData);

      // Validação de dados obrigatórios
      if (!resenhaData.next_forms) {
        console.log('Campo next_forms é obrigatório');
        // Se o campo next_forms não estiver presente, retorna status 400 (Bad Request)
        return res.status(400).json({ error: 'Campo next_forms é obrigatório' });
      }

      // Cria um novo registro de resenha com os dados recebidos
      const resenha = await Resenha.create(resenhaData).fetch();

      // Redireciona ou responde conforme necessário
      return res.status(201).json(resenha);
    } catch (error) {
      // Em caso de erro, loga o erro e retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      console.error('Erro no controlador Resenhas:', error);
      return res.status(500).json({ error: error.message });
    }
  },


  // Método para buscar todas as resenhas
  find: async function (req, res) {
    try {
      // Busca todos os registros na tabela Resenha
      const resenhas = await Resenha.find();
      // Retorna a lista de registros com status 200 (OK)
      return res.status(200).json(resenhas);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para buscar uma única resenha pelo ID
  findOne: async function (req, res) {
    try {
      // Busca um registro pelo ID fornecido nos parâmetros da requisição
      const resenha = await Resenha.findOne({ id: req.params.id });
      if (!resenha) {
        // Se não encontrar o registro, retorna status 404 (Not Found) e uma mensagem de erro
        return res.status(404).json({ error: 'Record not found' });
      }
      // Retorna o registro encontrado com status 200 (OK)
      return res.status(200).json(resenha);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },
};
