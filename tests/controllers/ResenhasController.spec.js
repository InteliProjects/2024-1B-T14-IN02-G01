const request = require('supertest');
const Resenha = require('../../api/models/Resenha'); // Importando o modelo Resenha
const sails = require('sails');

const resenha = require('../mocks/Resenha');

jest.mock('../../api/models/Resenha'); // Mocking the Resenha model

describe('ResenhasController', () => {

  let controller;

  beforeAll(async () => {
    controller = require('../../api/controllers/ResenhasController');
  });

  const newResenha = {
      age: 30,
      gender: 'Male',
      education_level: 'Graduate',
      house_type: 'Apartment',
      family_constitution: 'Nuclear',
      income: '35000',
      people_in_house: 4,
      country: 'Brazil',
      state: 'DF',
      city: 'Brasilia',
      neighborhood: 'Vicente Pires',
      next_forms: 'had',
      complete_name: 'Calebe Yan Veras Matias',
      social_name: 'Calebe Matias',
      phone: '61981596813',
      email: 'calebe.matias@inteli.edu.br',
  };

  describe('POST /resenhas', () => {
    it('deve criar um novo registro de Resenha e redirecionar', async () => {
      

      const mockedRequest = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: newResenha,
              statusCode: 201
            })
          }
        },
        session: { userId: 1 },
        body: newResenha
      };

      const mockedResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: mockedRequest,
              statusCode: 200
            })
          }
        }
      };

      const response = await controller.create(mockedRequest, mockedResponse);
      console.log(response);

      expect(response.body.body).toHaveProperty('id');
      expect(response.body.body.age).toBe(18);
    });

    it('deve retornar status 401 se o usuario nao for autenticado com sucesso', async () => {

      const mockResponse = {
        status: (statusCode) => ({
          json: () => ({
            body: { error: 'Usuário não autenticado' },
            statusCode: 401
          })
        })
      };

      const response = await controller.create({ body: newResenha, session: {} }, mockResponse);

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ error: 'Usuário não autenticado' });
    });

    it('deve retornar status 400 se o proximo nextforms nao for informado', async () => {
      
      const mockResponse = {
        status: (statusCode) => ({
          json: () => ({
            body: { error: 'Campo next_forms é obrigatório' },
            statusCode: 400
          })
        }),
        session: { user_id: 1 }
      };

      const response = await controller.create({ body: incompleteResenha, session: { user_id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Campo next_forms é obrigatório' });
    });
  });

  describe('GET /resenhas', () => {
    it('deve retornar todos os registros de Resenha com sucesso e retornar status 200', async () => {
      const mockResenhas = [{
        id: 1,
        age: 30,
        gender: 'Male',
        education_level: 'Graduate',
        house_type: 'Apartment',
        family_constitution: 'Nuclear',
        income: '5000',
        people_in_house: 4,
        country: 'Brazil',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        next_forms: 'NextForm1',
        complete_name: 'John Doe',
        social_name: 'JD',
        phone: '123456789',
        email: 'john.doe@example.com',
      }];

      const mockResponse = {
        status: (statusCode) => ({
          json: () => ({
            body: mockResenhas,
            statusCode: 200
          })
        })
      };

      Resenha.find.mockResolvedValue(mockResenhas);

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockResenhas);
    });

    it('deve retornar status 500 se houver um erro ao buscar os dados', async () => {
      const mockResponse = {
        status: (statusCode) => ({
          json: () => ({
            body: { error: 'Internal server error' },
            statusCode: 500
          })
        })
      };

      Resenha.find.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /resenhas/:id', () => {
    it('deve retornar os dados de uma linha específica da tabela Resenhas com status 200', async () => {
      const mockResenha = {
        id: 1,
        age: 30,
        gender: 'Male',
        education_level: 'Graduate',
        house_type: 'Apartment',
        family_constitution: 'Nuclear',
        income: '5000',
        people_in_house: 4,
        country: 'Brazil',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        next_forms: 'NextForm1',
        complete_name: 'John Doe',
        social_name: 'JD',
        phone: '123456789',
        email: 'john.doe@example.com',
      };

      const mockResponse = {
        status: (statusCode) => ({
          json: () => ({
            body: mockResenha,
            statusCode: 200
          })
        })
      };

      Resenha.findOne.mockResolvedValue(mockResenha);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockResenha);
    });

    it('deve retornar status 404 caso a linha específica não seja encontrada', async () => {
      const mockResponse = {
        status: (statusCode) => ({
          json: () => ({
            body: { error: 'Record not found' },
            statusCode: 404
          })
        })
      };

      Resenha.findOne.mockResolvedValue(null);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Record not found' });
    });

    it('deve retornar status 500 se houver um erro ao buscar a linha pelo ID', async () => {
      const mockResponse = {
        status: (statusCode) => ({
          json: () => ({
            body: { error: 'Internal server error' },
            statusCode: 500
          })
        })
      };

      Resenha.findOne.mockRejectedValue(new Error('Internal server error'));

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });
});
