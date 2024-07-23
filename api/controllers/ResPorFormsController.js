module.exports = {
  // Método para buscar todas as resenhas
  getData: async function (req, res) {
    try {
      // Query que retorna o número de respostas por tipo de formulário
      const query = "SELECT next_forms, COUNT(*) as count FROM Resenha GROUP BY next_forms";

      // Recebe os resultados vindos do banco de dados
      const resultado = await sails.sendNativeQuery(query);

      if (resultado.rows.length > 0) {
        // Salva as keys em uma array
        const keys = resultado.rows.map((row) => row.next_forms);

        // Salva os values em uma array
        const values = resultado.rows.map((row) => row.count);

        // Retorna os valores na forma de uma array com duas outras arrays, uma das chaves e uma dos valores
        return res.json([keys, values]);
      } else {
        // Retorna array vazia caso não haja resultados
        return res.json([[], []]);
      }
    } catch (error) {
      // Em caso de erro, retorna uma resposta com status 500 (Internal Server Error) e a mensagem de erro
      return res.status(500).json({ error: error.message });
    }
  },
};
