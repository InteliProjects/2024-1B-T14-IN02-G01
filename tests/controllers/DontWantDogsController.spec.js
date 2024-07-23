const DontWantDog = require('../mocks/DontWantDog');

describe('DontWantDogsController', () => {

  let controller;

  const newDontWantDog = {
    id_user: 1,
    reasons: 'Jamais compraria um cachorro, pois sempre odiei a presenca de animais dentro de casa. Nao suporto a ideia de ter que cuidar de um cachorro.'
  };

  beforeAll(async () => {
    controller = require('../../api/controllers/DontWantDogsController');
  });

  describe('POST /dontWantDogs', () => {
    it('deve criar um registro na tabela DontWantDog com as informacoes corretas e retornar status 201', async () => {

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: {
                id: 1,
                reasons: 'Jamais compraria um cachorro, pois sempre odiei a presenca de animais dentro de casa. Nao suporto a ideia de ter que cuidar de um cachorro.'
              },
              statusCode: 201
            })
          }
        }
      };

      const response = await controller.create({ body: newDontWantDog }, mockResponse);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.reasons).toBe('Jamais compraria um cachorro, pois sempre odiei a presenca de animais dentro de casa. Nao suporto a ideia de ter que cuidar de um cachorro.');
    });

    it('deve retornar status 400 se os dados estiverem incompletos', async () => {
      const incompleteDontWantDog = {
        id_user: 1
      };

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: { error: 'Incomplete data' },
              statusCode: 400
            })
          }
        }
      };

      const response = await controller.create({ body: incompleteDontWantDog }, mockResponse);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Incomplete data' });
    });
  });

  describe('GET /dontWantDogs', () => {
    it('deve retornar todos os dados da tabela DontWantDog com status 200', async () => {
      const mockDontWantDogs = [{
        id_user: 1,
        reasons: 'Jamais compraria um cachorro, pois sempre odiei a presenca de animais dentro de casa. Nao suporto a ideia de ter que cuidar de um cachorro.'
      }];

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: mockDontWantDogs,
              statusCode: 200
            })
          }
        }
      };

      DontWantDog.find.mockResolvedValue(mockDontWantDogs);

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDontWantDogs);
    });

    it('deve retornar status 500 se houver um erro ao buscar os dados', async () => {
      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: { error: 'Internal server error' },
              statusCode: 500
            })
          }
        }
      };

      DontWantDog.find.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /dontWantDogs/:id', () => {
    it('deve retornar uma linha especifica da tabela DontWantDog com status 200', async () => {
      const mockDontWantDog = {
        id: 1,
        id_user: 1,
        reasons: 'Jamais compraria um cachorro, pois sempre odiei a presenca de animais dentro de casa. Nao suporto a ideia de ter que cuidar de um cachorro.'
      };

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: mockDontWantDog,
              statusCode: 200
            })
          }
        }
      };

      DontWantDog.findOne.mockResolvedValue(mockDontWantDog);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDontWantDog);
    });

    it('deve retornar status 404 se a linha da tabela nao for encontrada baseada no ID', async () => {
      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: { error: 'Record not found' },
              statusCode: 404
            })
          }
        }
      };

      DontWantDog.findOne.mockResolvedValue(null);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Record not found' });
    });

    it('deve retornar status 500 se houver um erro ao buscar a linha pelo ID', async () => {
      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: { error: 'Internal server error' },
              statusCode: 500
            })
          }
        }
      };

      DontWantDog.findOne.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });
});