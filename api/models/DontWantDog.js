/**
 * Dont_want_dog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // Define os atributos do modelo
  attributes: {
    // Relacionamento com a tabela/collection 'User'. Cada registro nesta tabela está associado a um usuário.
    id_user: {
      model: 'User',
    },

    // Motivos pelos quais o usuário não quer um cachorro. É um campo obrigatório.
    reasons: {
      type: 'string',
      required: true,
    }
  },
};
