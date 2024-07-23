/**
 * resenha.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // Idade do usuário que preenche a resenha.
    age: {
      type: 'number',
      columnName: 'age',
      required: true,
    },
    // Gênero do usuário.
    gender: {
      type: 'string',
      columnName: 'gender',
      required: true,
    },
    // Nível de educação do usuário.
    education_level: {
      type: 'string',
      columnName: 'education_level',
      required: true,
    },
    // Tipo de casa onde o usuário mora.
    house_type: {
      type: 'string',
      columnName: 'house_type',
      required: true,
    },
    // Composição familiar do usuário.
    family_constitution: {
      type: 'string',
      columnName: 'family_constitution',
      required: true,
    },
    // Renda do usuário.
    income: {
      type: 'string',
      columnName: 'income',
      required: true,
    },
    // Número de pessoas na casa do usuário.
    people_in_house: {
      type: 'number',
      columnName: 'people_in_house',
      required: true,
    },
    // País onde o usuário mora.
    country: {
      type: 'string',
      columnName: 'country',
      required: true,
    },
    // Estado onde o usuário mora.
    state: {
      type: 'string',
      columnName: 'state',
      required: true,
    },
    // Cidade onde o usuário mora.
    city: {
      type: 'string',
      columnName: 'city',
      required: true,
    },
    // Bairro onde o usuário mora.
    neighborhood: {
      type: 'string',
      columnName: 'neighborhood',
      required: true,
    },
    // Próximos formulários a serem preenchidos pelo usuário.
    next_forms: {
      type: 'string',
      columnName: 'next_forms',
      required: true,
    },
    // Nome completo do usuário. Pode ser nulo.
    complete_name: {
      type: 'string',
      columnName: 'complete_name',
      allowNull: true,
    },
    // Nome social do usuário. Pode ser nulo.
    social_name: {
      type: 'string',
      columnName: 'social_name',
      allowNull: true,
    },
    // Telefone do usuário. Pode ser nulo.
    phone: {
      type: 'string',
      columnName: 'phone',
      allowNull: true,
    },
    // Email do usuário. Pode ser nulo.
    email: {
      type: 'string',
      columnName: 'email',
      allowNull: true,
    },
    // Relacionamento com a tabela de usuários. Campo obrigatório.
    user_id: {
      model: 'user',
      columnName: 'user_id',
      //required: true,
    },
    
    // Permissão de contato.
    contact_permission: {
      type: 'string',
      //required: true,
    }
  }
};
