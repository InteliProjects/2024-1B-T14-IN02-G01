const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const archiver = require("archiver");
const fs = require("fs");
const path = require("path");

module.exports = {
  downloadCsv: async function (req, res) {
    try {
      // Diretório temporário para salvar os CSVs
      const tempDir = path.join(__dirname, "../../assets/tmp");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      // Nomes das tabelas (modelos)
      const tables = [
        "DontWantDog",
        "HadDog",
        "HaveDog",
        "Resenha",
        "User",
        "WantDog",
      ];

      let allTablesEmpty = true;

      // Função para escrever CSVs
      const writeCsv = async (modelName) => {
        const model = sails.models[modelName.toLowerCase()];
        if (!model) {
          throw new Error(`Model ${modelName} does not exist`);
        }
        const records = await model.find();
        if (records.length === 0) {
          console.warn(`No records found for table: ${modelName}`);
          return false;
        }
        allTablesEmpty = false;
        const csvWriter = createCsvWriter({
          path: path.join(tempDir, `${modelName}.csv`),
          header: Object.keys(records[0]).map((key) => ({
            id: key,
            title: key,
          })),
        });
        await csvWriter.writeRecords(records);
        return true;
      };

      // Escrever CSVs para cada tabela
      for (const table of tables) {
        await writeCsv(table);
      }

      // Verificar se todas as tabelas estão vazias
      if (allTablesEmpty) {
        throw new Error("Todas as tabelas estão vazias.");
      }

      // Criar o arquivo ZIP
      const zipPath = path.join(tempDir, "data.zip");
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", {
        zlib: { level: 9 },
      });

      // Escutar eventos de finalização e erro
      output.on("close", () => {
        return res.download(zipPath, "data.zip", (err) => {
          if (err) {
            console.error(err);
          }
          // Limpar os arquivos temporários após o download
          fs.readdir(tempDir, (err, files) => {
            if (err) throw err;
            for (const file of files) {
              fs.unlink(path.join(tempDir, file), (err) => {
                if (err) throw err;
              });
            }
          });
        });
      });

      archive.on("error", (err) => {
        throw err;
      });

      // Pipe data para o stream de escrita
      archive.pipe(output);

      // Adicionar arquivos CSV ao ZIP
      tables.forEach((table) => {
        const csvPath = path.join(tempDir, `${table}.csv`);
        if (fs.existsSync(csvPath)) {
          archive.file(csvPath, { name: `${table}.csv` });
        }
      });

      // Finalizar o arquivo ZIP
      await archive.finalize();
    } catch (error) {
      console.error(error);
      return res.serverError(error.message || "Erro ao exportar dados.");
    }
  },
};
