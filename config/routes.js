/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const { policies } = require("./policies");

module.exports.routes = {
  "/": { view: "pages/homepage" },
  "/login": { view: "pages/login" },
  "/generalforms": { view: "pages/generalForms" },
  "/formsNull": { view: "pages/formsNull" },
  "/formsHad": { view: "pages/formsHad" },
  "/formsHave": { view: "pages/formsHave" },
  "/formswant": { view: "pages/formswant" },
  "/dashboard": { view: "pages/dashboard" },
  "/finalPage": { view: "pages/finalPage" },
  "/phoneLogin": {view: "pages/phoneLogin"},
  'GET /forgotPassword': { view: 'pages/forgotPassword' },

  // Rotas para visualizar a Documentação
  "/docsRoutes": { view: "pages/docs/docs" },
  "/docsResenha": { view: "pages/docs/docsResenha" },
  "/docsHaveDog": { view: "pages/docs/docsHaveDog" },
  "/docsHadDog": { view: "pages/docs/docsHadDog" },
  "/docsDontWantDog": { view: "pages/docs/docsDontWantDog" },
  "/docsWantDog": { view: "pages/docs/docsWantDog" },

  // Rotas do Formulário Resenha
  "POST /resenhas": { action: "Resenha/create" },
  "GET /resenhas": { action: "Resenha/find" },
  "GET /resenhas/:id": { action: "Resenha/findOne" },
  "GET /generalforms": "UsersController.showGeneralForms",

  // Rotas do Formulário HaveDog
  "POST /haveDogs": "HaveDogsController.create",
  "GET /haveDogs": "HaveDogsController.find",
  "GET /haveDogs/:id": "HaveDogsController.findOne",

  // Rotas do Formulário HadDog
  "POST /hadDogs": { action: "HadDog/create" },
  "GET /hadDogs": { action: "HadDog/find" },
  "GET /hadDogs/:id": { action: "HadDog/findOne" },

  // Rotas do Formulário DontWantDogs
  "POST /dontWantDogs": { action: "DontWantDogs/create" },
  "GET /dontWantDogs": { action: "DontWantDogs/find" },
  "GET /dontWantDogs/:id": { action: "DontWantDogs/findOne" },

  // Rotas do Formulário ReasonsToHaveADog
  "POST /reasonsToHaveTheDogs": { action: "ReasonsToHaveTheDog/create" },
  "GET /reasonsToHaveTheDogs": { action: "ReasonsToHaveTheDog/find" },
  "GET /reasonsToHaveTheDogs/:id": { action: "ReasonsToHaveTheDog/findOne" },

  // Rotas do Formulário WantDog
  "POST /wantDogs": { action: "WantDogs/create" },
  "GET /wantDogs": { action: "WantDogs/find" },
  "GET /wantDogs/:id": { action: "WantDogs/findOne" },

  // Rotas do Formulário de Login
  "POST /users": { action: "User/create" },
  "GET /users": { action: "User/find" },
  "GET /users/:id": { action: "User/findOne" },
  // Página de registro e login
  "GET /register": { view: "pages/register" },
  "GET /login": { view: "pages/login" },

  // Rotas do dashboard
  "GET /resPorForms": "ResPorFormsController.getData", // Solicita dados para gráfico do tipo de respostas
  "GET /resByMonth": "ResByMonthController.getResponsesByMonth", // Solicita dados para gráfico de quantidade de respostas por mês
  "GET /export/download": "ExportController.downloadCsv", // Formata e disponibiliza dados para download

  //Rotas do Firebase
  'POST /googleLogin': 'AuthController.googleLogin',
  'POST /authLogin': 'AuthController.emailLogin',
  'POST /authRegister': 'AuthController.emailCadastro',
  'POST /forgotPassword': 'AuthController.forgotPassword',
  'POST /resetPassword': 'AuthController.resetPassword',
  'POST /phoneLogin': 'AuthController.phoneLogin'
};
