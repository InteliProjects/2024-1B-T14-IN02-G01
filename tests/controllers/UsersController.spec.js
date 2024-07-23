const bcrypt = require('bcrypt');
const User = require('../mocks/User');


describe('UsersController', () => {

  let controller;

  beforeAll(async () => {
    controller = require('../../api/controllers/UsersController');
  });

  describe('POST /users', () => {
    it('deve criar um novo usuario na tabela User com as informacoes corretas e retornar o status 201', async () => {
      const newUser = {
        name: 'Calebe Matias',
        email: 'calebe.matias@sou.inteli.edu.br',
        password: 'inteli123',
        role: 'user'
      };

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: newUser,
              statusCode: 201
            })
          }
        }
      };

      const response = await controller.create({ body: newUser }, mockResponse);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("email", "calebe.matias@sou.inteli.edu.br");
      expect(response.body.name).toBe('Calebe Matias');
    });
  });

  describe('GET /users', () => {
    it('deve retornar todas as informacoes da tabela Users com status 200', async () => {
      const mockUsers = [
        {
        name: 'Calebe Matias',
        email: 'calebe.matias@sou.inteli.edu.br',
        password: 'inteli123',
        role: 'user'
        }, {
        name: 'Leonardo Ogata',
        email: 'leonardo.ogata@sou.inteli.edu.br',
        password: 'inteli321',
        role: 'user'
        }
    ];

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: mockUsers,
              statusCode: 200
            })
          }
        }
      };

      User.find.mockResolvedValue(mockUsers);

      const response = await controller.find({}, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body[1].password).toBe('inteli321');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a specific User record successfully and return status 200', async () => {
      const mockUser = {
        id: 1,
        name: 'Calebe Matias',
        email: 'calebe.matias@inteli.inteli.edu.br',
        password: 'hashedpassword123',
        role: 'user'
      };

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: mockUser,
              statusCode: 200
            })
          }
        }
      };

      User.findOne.mockResolvedValue(mockUser);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 404 if the specific User record is not found', async () => {
      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: { error: 'User not found' },
              statusCode: 404
            })
          }
        }
      };

      User.findOne.mockResolvedValue(null);

      const response = await controller.findOne({ params: { id: 1 } }, mockResponse);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a specific User record successfully and return status 200', async () => {
      const updatedUser = {
        name: 'Calebe Matias Atualizado',
        email: 'calebe.matias@sou.inteli.edu.br',
        password: 'inteli123',
        role: 'admin'
      };

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: updatedUser,
              statusCode: 200
            })
          }
        }
      };

      User.updateOne.mockResolvedValue(updatedUser);

      const response = await controller.update({ params: { id: 1 }, body: updatedUser }, mockResponse);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedUser);
    });

    it('should return 404 if the specific User record to update is not found', async () => {
      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: { error: 'User not found' },
              statusCode: 404
            })
          }
        }
      };

      User.updateOne.mockResolvedValue(null);

      const response = await controller.update({ params: { id: 1 }, body: {} }, mockResponse);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('POST /register', () => {
    it('deve criar um novo usuario com uma senha hasheada e redirecionar para a rota /login', async () => {
      let newUser = {
        name: 'Calebe Matias',
        email: 'calebe.matias@sou.inteli.edu.br',
        password: 'inteli123',
        role: 'user'
      };

      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const UserHasheado = { ...newUser, password: hashedPassword, id: 1 };

      const mockResponse = {
        redirect: (url) => {
          return {
            url: url
          }
        }
      };

      // Mocking the User.create method to return the hashed user

      User.create.mockResolvedValue(UserHasheado);

      const response = await controller.register({ body: UserHasheado }, mockResponse.redirect('/login'));

      expect(response.url).toBe('/login');
    });
  });

  describe('POST /login', () => {
    it('deve loggar o usuário e redirecionar para a rota do forms geral com sucesso', async () => {
        const userCredentials = {
        email: 'calebe.matias@sou.inteli.edu.br',
        password: 'inteli123'
        };

        const hashedPassword = await bcrypt.hash(userCredentials.password, 10);

        const mockUser = {
        id: 1,
        name: 'Calebe Matias',
        email: userCredentials.email,
        password: hashedPassword,
        role: 'user'
        };

        const mockedRequest = {
            body: userCredentials,
            session: {}
        };
      const mockResponse = {
        redirect: (url) => {
          return {
            url: url,
            statusCode: 302
          }
        },
        session: {},
        status: (sts1) => {
            return {
                json: (json) => ({
                    body: json,
                    statusCode: sts1
                }),
            }
        }
      };

      User.findOne.mockResolvedValue(mockUser);

      const response = await controller.login(mockedRequest, mockResponse);
      console.log(response);
 
      expect(response.url).toBe('/generalforms');
      expect(response.statusCode).toBe(302);
    });

    it('should return 404 if the user is not found', async () => {
      const userCredentials = {
        email: 'john.doe@example.com',
        password: 'password123'
      };

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: { error: 'User not found' },
              statusCode: 404
            })
          }
        }
      };

      User.findOne.mockResolvedValue(null);

      const response = await controller.login({ body: userCredentials, session: {} }, mockResponse);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    it('should return 401 if the password is incorrect', async () => {
      const userCredentials = {
        email: 'calebe.matias@sou.inteli.edu.br',
        password: 'senhaerrada123'
      };

      const hashedPassword = await bcrypt.hash('senhaqualquer', 10);
      const mockUser = {
        id: 1,
        name: 'Calebe Matias',
        email: userCredentials.email,
        password: hashedPassword,
        role: 'user'
      };

      const mockResponse = {
        status: (statusCode) => {
          return {
            json: () => ({
              body: { error: 'Invalid password' },
              statusCode: 401
            })
          }
        }
      };

      User.findOne.mockResolvedValue(mockUser);

      const response = await controller.login({ body: userCredentials, session: {} }, mockResponse);

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid password' });
    });
  });
});