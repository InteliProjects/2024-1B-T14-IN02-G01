// Exporta os métodos mockados de criação e busca de registros de dados pro teste do ResenhasController.
module.exports = {
    create: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
  };
  