// Exporta os métodos mockados de criação e busca de registros de cachorros pro teste do DontWantDogController.
module.exports = {
    create: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
  };
  