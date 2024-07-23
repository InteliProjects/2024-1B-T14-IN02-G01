const HadDog = require('../mocks/HadDog.js');

describe('HadDogsController', () => {

  let controller;

  const newDog = {
    id_user: 1,
    dogs_name: 'Bolt',
    belonging: 'Meu',
    dogs_personality: 'Extremamente inteligente e leal',
    how_much_stayed: 15,
    first_dog: 'Yes',
    number_dogs: 1,
    number_cats: 0,
    inclusion_year: '2009',
    castrated: 'No',
    castration_age: 1,
    breed: 'Golden Retriever',
    breed_type: 'Raça Definida',
    dogs_origin: 'Criador',
    cost_to_acquire: 'Yes',
    reason_live_with_other_dog: 1,
    dogs_characteristics: 'Pelo comprido, Grande porte, Amigável e brincalhão',
    involved_decision: 'Family',
    favorite_things_first_weeks: 'Playing in the yard',
    dont_liked_things: 'Chewing furniture',
    vet_visits: 'Yes',
    number_of_vet_visits: 3,
    visit_reason: 'Vaccinations',
    stopped_live_with_dog: '2024-05-01',
    stopped_live_dogs_age: 15,
    reason_stopped_living: 'He unfortunately passed away',
    would_live_with_other_dog: 'No',
    reason_would_live_with_other_dog: 'Companionship',
    contact_permission: 'Yes',
  };

  beforeAll(async () => {
    controller = require('../../api/controllers/HadDogsController');
  });

  describe('POST /hadDogs', () => {
    it('deve criar um novo registro HadDog com sucesso e retornar o status 201', async () => {
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
      expect(response.body).toHaveProperty('id_user', 1);
      expect(response.body.dogs_name).toBe('Bolt');
      expect(response.body.dogs_personality).toBe('Extremamente inteligente e leal');
    });

    it('deve retornar status 400 se os dados estiverem incompletos', async () => {
      const incompleteDog = {
        id_user: 1,
        dogs_name: 'Bolt'
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

  describe('GET /hadDogs', () => {
    it('deve retornar os dados de todos os cachorros com status 200', async () => {
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

      HadDog.find.mockResolvedValue(mockDogs);

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDogs);
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

      HadDog.find.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /hadDogs/:id', () => {
    it('deve retornar um registro específico do HadDog com sucesso e retornar o status 200', async () => {
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

      HadDog.findOne.mockResolvedValue(mockDog);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDog);
    });

    it('deve retornar o status 404 se o dado não foi encontrado', async () => {
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

      HadDog.findOne.mockResolvedValue(null);

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

      HadDog.findOne.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });
});
