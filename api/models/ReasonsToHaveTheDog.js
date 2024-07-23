/**
 * Reasons_to_have_the_dog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// Define os atributos do modelo
module.exports = {
  attributes: {
    kids_company:{
      type: "string",
      required: false,
    },

    adults_company:{
      type: "string",
      required: false,
    },
    // Se o cachorro foi escolhido pela sua aparência.
    appearance: {
      type: "string",
      required: false,
    },

    dogs_company:{
      type: "string",
      required: false,
    },

    responsibility_to_children:{
      type: "string",
      required: false,
    },

    friends_have:{
      type: "string",
      required: false,
    },
    // Se o cachorro proporciona proteção.
    protection: {
      type: "string",
      required: false,
    },

    help_friend_couldnt_keep_it: {
      type: "string",
      required: false,
    },

    save_my_life: {
      type: "string",
      required: false,
    },

    was_cute:{
      type: "string",
      required: false,
    },

    chose_me: {
      type: "string",
      required: false,
    },

    gift:{
      type: "string",
      required: false,
    },

    parents_had:{
      type: "string",
      required: false,
    },
  
    met_media:{
      type: "string",
      required: false,
    },

    others:{
      type: "string",
      required: false,
    }

  },

};
