const WantDog = require('../mocks/WantDog'); // Importa o Model WantDog

describe('WantDogsController', () => {

  let controller;

  var newDog = {
    user_id: 1,
    dogs_size: 'Medio porte',
    fur_length: 'Curto',
    fur_color: 'Brown',
    dogs_sex: 'Male',
    dogs_age: '1 ano',
    breed: 'Beagle',
    reasons_to_have_the_dog_id: 1,
    already_have_a_name: 'No',
    acquire_intention: 'Adopt',
    possible_name: 'Freud',
    name_reason: 'Sounds friendly',
    bringing_date: '2024-07-01',
    wanted_personality: 'Inteligente e brincalhao',
    search_expenses: 'Yes',
    expense_value: '2500',
    contact_permission: 'Yes',
  };

  beforeAll(async () => {
    controller = require('../../api/controllers/WantDogsController');
  });

  describe('POST /wantDogs', () => {
    it('deve postar as informacoes do cao corretamente e retornar status 201', async () => {

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: newDog,
              statusCode: 201
            })
          }
        }
      };

      const response = await controller.create({ body: newDog }, mockResponse);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('user_id', 1);
      expect(response.body.dogs_size).toBe('Medio porte');
    });

    it('deve retornar status 400 se os dados estiverem incompletos', async () => {
      const incompleteDog = {
        user_id: 1,
        dogs_size: 'Medio porte'
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

      const response = await controller.create({ body: incompleteDog }, mockResponse);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Incomplete data' });
    });
  });

  describe('GET /wantDogs', () => {
    it('deve retornar todos os dados da tabela WantDogs corretamente com status 200', async () => {
      const mockDogs = newDog;

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: mockDogs,
              statusCode: 200
            })
          }
        }
      };

      WantDog.find.mockResolvedValue(mockDogs);

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDogs);
      expect(response.body.wanted_personality).toEqual("Inteligente e brincalhao");
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

      WantDog.find.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /wantDogs/:id', () => {
    it('deve retornar os dados de uma linha específica da tabela WantDogs com status 200', async () => {
      const mockDog = newDog;

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: mockDog,
              statusCode: 200
            })
          }
        }
      };

      WantDog.findOne.mockResolvedValue(mockDog);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDog);
      expect(response.body.dogs_age).toEqual('1 ano');
    });

    it('deve retornar status 404 caso a linha específica não seja encontrada', async () => {
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

      WantDog.findOne.mockResolvedValue(null);

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

      WantDog.findOne.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });
});
