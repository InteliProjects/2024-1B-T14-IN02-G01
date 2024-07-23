  /**
   * User.js
   *
   * @description :: A model definition represents a database table/collection.
   * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
   */

  module.exports = {
    // Definição dos atributos do modelo
    attributes: {
      uid: {
        type: 'string',
        unique: true,
        //required: true
      },

      email: {
        type: 'string',
        unique: true,
        required: true,
        isEmail: true
      },

      name: {
        type: 'string',
        required: true
      },

      picture: {
        type: 'string'
      },

      // Função do usuário, pode ser 'admin' ou 'user'
      role: {
        type: 'string',    // Tipo de dado: string
        isIn: ['admin', 'user'],    // Deve ser um dos valores especificados
        defaultsTo: 'user',    // Valor padrão se não especificado
      },
    },
};
