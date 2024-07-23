// Exporta os métodos mockados de criação e busca de registros de cachorros pro teste do WantDogsController.
module.exports = {
    create: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
  };
  