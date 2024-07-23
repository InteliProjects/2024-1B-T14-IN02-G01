module.exports = {
    // Método para buscar a quantidade de respostas por mês
    getResponsesByMonth: async function (req, res) {
      try {
        // Query que retorna o número de respostas por mês
        const query = `SELECT TO_CHAR(TO_TIMESTAMP("createdAt" / 1000), 'MM/YY') as month, COUNT(*) as count FROM resenha GROUP BY month;`;
  
        // Recebe os resultados vindos do banco de dados
        const resultado = await sails.sendNativeQuery(query);
  
        if (resultado.rows.length > 0) {
          // Salva os meses em uma array
          const months = resultado.rows.map((row) => row.month);
  
          // Salva os valores em uma array
          const counts = resultado.rows.map((row) => row.count);
  
          // Retorna os valores na forma de uma array com duas outras arrays, uma dos meses e outra dos valores
          return res.json([months, counts]);
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
  