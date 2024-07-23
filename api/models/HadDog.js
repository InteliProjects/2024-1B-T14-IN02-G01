/**
 * had_dog.js
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
      columnName: 'id_user',
      //required: true,
    },

    // Nome do(s) cachorro(s) que o usuário teve.
    dogs_name: {
      type: 'string',
      required: true,
    },

    // Descrição de posse do(s) cachorro(s).
    belonging: {
      type: 'string',
      required: true,
    },

    // Personalidade do(s) cachorro(s).
    dogs_personality: {
      type: 'string',
      required: true,
    },

    // Tempo de convívio com o(s) cachorro(s).
    how_much_stayed: {
      type: 'number',
      required: true,
    },

    // Se o(s) cachorro(s) foi(am) o(s) primeiro(s).
    first_dog: {
      type: 'string',
      required: true,
    },

    // Número de outros cachorros de estimação na casa.
    number_dogs: {
      type: 'number',
      required: true,
    },

    // Número de outros gatos de estimação na casa.
    number_cats: {
      type: 'number',
      required: true,
    },

    // Ano da inclusão do cachorro.
    inclusion_year: {
      type: 'string',
      required: true,
    },

    // Se o(s) cachorro(s) foi(am) castrado(s).
    castrated: {
      type: 'string',
      required: true,
    },

    // Idade da castração do(s) cachorro(s).
    castration_age: {
      type: 'string',
    },

    // Raça do(s) cachorro(s).
    breed: {
      type: 'string',
      required: true,
    },

    // Tipo de Raça do(s) cachorro(s)
    breed_type: {
      type: 'string',
    },

    // Origem do(s) cachorro(s).
    dogs_origin: {
      type: 'string',
      required: true,
    },

    // Custo para adquirir o(s) cachorro(s).
    cost_to_acquire: {
      type: 'string',
      required: true,
    },

    // Motivo para viver com outro(s) cachorro(s) novamente.
    reason_live_with_other_dog: {
      model: 'ReasonsToHaveTheDog',
      columnName: 'reason_live_with_other_dog',
      //required: true,
    },

    // Características do(s) cachorro(s).
    dogs_characteristics: {
      type: 'string',
      required: true,
    },

    // Nome da pessoa envolvida na decisão de adquirir o(s) cachorro(s).
    involved_decision: {
      type: 'string',
      required: true,
    },

    // Coisas favoritas sobre as primeiras semanas com o(s) cachorro(s).
    favorite_things_first_weeks: {
      type: 'string',
      required: true,
    },

    // Coisas que não gostaram sobre as primeiras semanas com o(s) cachorro(s).
    dont_liked_things: {
      type: 'string',
      required: true,
    },

    // Visitas ao veterinário.
    vet_visits: {
      type: 'string',
      required: true,
    },

    // Número de visitas ao veterinário.
    number_of_vet_visits: {
      type: 'string',
    },

    // Motivo das visitas ao veterinário.
    visit_reason: {
      type: 'string',
    },

    // Data em que deixaram de viver com o(s) cachorro(s).
    stopped_live_with_dog: {
      type: 'ref',
      columnType: 'date',
    },

    // Idade do(s) cachorro(s) quando pararam de viver com eles.
    stopped_live_dogs_age: {
      type: 'number',
      required: true,
    },

    // Motivo para parar de viver com o(s) cachorro(s).
    reason_stopped_living: {
      type: 'string',
      required: true,
    },

    // Viveriam com outro(s) cachorro(s) novamente.
    would_live_with_other_dog: {
      type: 'string',
      required: true,
    },

    reason_would_live_with_other_dog: {
      type: 'string',
    },
  },
};
