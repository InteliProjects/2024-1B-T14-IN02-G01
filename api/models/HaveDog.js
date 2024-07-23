/**
 * have_dog.js
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

    // Nome do cachorro.
    dogs_name: {
      type: 'string',
      required: true,
    },

    // Sexo do cachorro.
    dogs_sex: {
      type: 'string',
      required: true,
    },

    // Tutor do cachorro.
    tutor: {
      type: 'string',
      required: true,
    },

    // Se o cachorro é castrado.
    castrated: {
      type: 'string',
      required: true,
    },

    // Data de castração do cachorro.
    castration_date: {
      type: 'string',
    },

    // Tempo de convívio com o cachorro.
    time_w_dog: {
      type: 'string',
      required: true,
    },

    // Se o cachorro é o primeiro do tutor.
    first_dog: {
      type: 'string',
      required: true,
    },

    // Quantidade de pets na casa.
    number_pets: {
      type: 'number',
      required: true,
    },

    // Idade do cachorro.
    dogs_age: {
      type: 'string',
      //required: true,
    },

    // Raça do cachorro.
    breed: {
      type: 'string',
      required: true,
    },

    // Origem do cachorro.
    dogs_origin: {
      type: 'string',
      required: true,
    },

    // Pagou para adquirir o cachorro.
    paid_to_acquire: {
      type: 'string',
      required: false,
    },

    // Idade do cachorro quando chegou.
    age_dog_arrived: {
      type: 'string',
      required: true,
    },

    // Personalidade do cachorro.
    dogs_personality: {
      type: 'string',
      required: true,
    },

    // Outros motivos para ter o cachorro.
    reasons_to_have_the_dog: {
      model: 'ReasonsToHaveTheDog',
      //required: true,
    },

    // Coisas que o tutor gosta no cachorro.
    characteristics: {
      type: 'string',
      required: true,
    },

    // Pessoa envolvida na decisão de adquirir o cachorro.
    involved_in_decision: {
      type: 'string',
      required: true,
    },

    // Se o tutor já teve dificuldade em manter um cachorro anteriormente.
    couldnt_keep_a_dog_before: {
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
      type: 'number',
    },

    // Sobre o cachorro.
    about_dog: {
      type: 'string',
      required: true,
    }
  },
};