/**
 * DontWantDogsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  // Método para criar um novo registro de DontWantDog
  create: async function (req, res) {
    try {
      // Cria um novo registro com os dados recebidos no corpo da requisição e retorna o registro criado
      const dontWantDog = await DontWantDog.create(req.body).fetch();
      // Retorna o registro criado com status 201 (Created)
      return res.status(201).json(dontWantDog);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para buscar todos os registros de DontWantDog
  find: async function (req, res) {
    try {
      // Busca todos os registros na tabela DontWantDog
      const dontWantDogs = await DontWantDog.find();
      // Retorna a lista de registros com status 200 (OK)
      return res.status(200).json(dontWantDogs);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para buscar um único registro de DontWantDog pelo ID
  findOne: async function (req, res) {
    try {
      // Busca um registro pelo ID fornecido nos parâmetros da requisição
      const dontWantDog = await DontWantDog.findOne({ id: req.params.id });
      if (!dontWantDog) {
        // Se não encontrar o registro, retorna status 404 (Not Found) e uma mensagem de erro
        return res.status(404).json({ error: 'Record not found' });
      }
      // Retorna o registro encontrado com status 200 (OK)
      return res.status(200).json(dontWantDog);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },
};
