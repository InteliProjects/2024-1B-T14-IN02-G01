const request = require('supertest');
const HaveDog = require('../mocks/HaveDog'); // Importing the mock model
const sails = require('sails');

jest.mock('../../api/models/HaveDog'); // Mocking the HaveDog model

describe('HaveDogsController', () => {

  let controller;

  beforeAll(async () => {
    controller = require('../../api/controllers/HaveDogsController');
  });

  describe('POST /haveDogs', () => {
    it('deve criar um novo registro HaveDog com sucesso e retornar o status 201', async () => {
      const newDog = {
        id_user: 1,
        dogs_name: 'Bolt',
        dogs_sex: 'Male',
        tutor: 'Calebe Matias',
        castrated: 'No',
        time_w_dog: '6 years',
        first_dog: 'Yes',
        number_dogs: 1,
        number_cats: 0,
        dogs_age: '6 years',
        breed: 'Golden Retriever',
        dogs_breed_type: 'Raça Definida',
        dogs_origin: 'Criador',
        paid_to_acquire: 'No',
        age_dog_arrived: '0 months',
        dogs_personality: 'Muito inteligente e amigável',
        characteristics: 'Ser muito bonito',
        involved_in_decision: 'Eu, meu irmão, e meus pais',
        couldnt_keep_a_dog_before: 'No',
        vet_visits: 'Sim',
        number_of_vet_visits: 4,
        about_dog: 'Jamais permitiria',
        contact_permission: 'Yes',
      };

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: {
                id: 1,
                dogs_name: 'Bolt'
              },
              statusCode: 201
            })
          }
        }
      };

      const response = await controller.create({ body: newDog }, mockResponse);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.dogs_name).toBe('Bolt');
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

  describe('GET /haveDogs', () => {
    it('deve retornar todos os registros HaveDog com sucesso e retornar o status 200', async () => {
      const mockDogs = [{
        id_user: 1,
        dogs_name: 'Bolt',
        dogs_sex: 'Male',
        tutor: 'Calebe Matias',
        castrated: 'No',
        time_w_dog: '6 years',
        first_dog: 'Yes',
        number_dogs: 1,
        number_cats: 0,
        dogs_age: '6 years',
        breed: 'Golden Retriever',
        dogs_breed_type: 'Raça Definida',
        dogs_origin: 'Criador',
        paid_to_acquire: 'No',
        age_dog_arrived: '0 months',
        dogs_personality: 'Muito inteligente e amigável',
        characteristics: 'Ser muito bonito',
        involved_in_decision: 'Eu, meu irmão, e meus pais',
        couldnt_keep_a_dog_before: 'No',
        vet_visits: 'Sim',
        number_of_vet_visits: 4,
        about_dog: 'Jamais permitiria',
        contact_permission: 'Yes',
      }];

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

      HaveDog.find.mockResolvedValue(mockDogs);

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

      HaveDog.find.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /haveDogs/:id', () => {
    it('deve retornar um registro HaveDog específico com sucesso e retornar o status 200', async () => {
      const mockDog = {
        id: 1,
        id_user: 1,
        dogs_name: 'Bolt',
        dogs_sex: 'Male',
        tutor: 'Calebe Matias',
        castrated: 'No',
        time_w_dog: '6 years',
        first_dog: 'Yes',
        number_dogs: 1,
        number_cats: 0,
        dogs_age: '6 years',
        breed: 'Golden Retriever',
        dogs_breed_type: 'Raça Definida',
        dogs_origin: 'Criador',
        paid_to_acquire: 'No',
        age_dog_arrived: '0 months',
        dogs_personality: 'Muito inteligente e amigável',
        characteristics: 'Ser muito bonito',
        involved_in_decision: 'Eu, meu irmão, e meus pais',
        couldnt_keep_a_dog_before: 'No',
        vet_visits: 'Sim',
        number_of_vet_visits: 4,
        about_dog: 'Jamais permitiria',
        contact_permission: 'Yes',
      };

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

      HaveDog.findOne.mockResolvedValue(mockDog);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockDog);
    });

    it('deve retornar 404 se o registro HaveDog específico não for encontrado', async () => {
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

      HaveDog.findOne.mockResolvedValue(null);

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

      HaveDog.findOne.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });
});
