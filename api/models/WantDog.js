/**
 * want_dog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // Definição dos atributos do modelo
  attributes: {
    // ID do usuário que deseja um cachorro (referência ao modelo User)
    user_id: {
      model: 'user',
      columnName: 'user_id',
      //required: true,
    },

    // Tamanho do cachorro desejado
    dogs_size: {
      type: 'string',
      required: true,
    },

    // Comprimento do pelo do cachorro desejado
    fur_length: {
      type: 'string',
      required: true,
    },

    // Cor do pelo do cachorro desejado
    fur_color: {
      type: 'string',
      required: true,
    },

    // Sexo do cachorro desejado
    dogs_sex: {
      type: 'string',
      required: true,
    },

    // Idade do cachorro desejado
    dogs_age: {
      type: 'string',
      required: true,
    },

    // Raça do cachorro desejado
    breed: {
      type: 'string',
      required: true,
    },

    // Motivos para querer ter o cachorro (referência ao modelo ReasonsToHaveTheDog)
    reasons_to_have_the_dog_id: {
      model: 'ReasonsToHaveTheDog',
      columnName: 'reasons_to_have_the_dog_id',
      //required: true,
    },

    // Já tem um nome para o cachorro?
    already_have_a_name: {
      type: 'string',
      required: true,
    },

    acquire_intention:{
      type: 'string',
      required: true,
    },

    // Nome possível para o cachorro
    possible_name: {
      type: 'string',
    },

    // Razão para escolha do nome
    name_reason: {
      type: 'string',
    },

    // Data prevista para trazer o cachorro para casa
    bringing_date: {
      type: 'string',
      required: true,
    },

    // Personalidade desejada para o cachorro
    wanted_personality: {
      type: 'string',
      required: true,
    },

    // Pesquisou sobre a médias das despesas mensais
    search_expenses: {
      type: 'string',
      required: true,
    },

    // Valor das médias das despesas médias
    expense_value: {
      type: 'string',
    },
  },
};
