// Exporta os métodos mockados de criação e busca de registros de cachorros pro teste do UsersController.
module.exports = {
    create: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    updateOne: jest.fn().mockResolvedValue({})
  };
  