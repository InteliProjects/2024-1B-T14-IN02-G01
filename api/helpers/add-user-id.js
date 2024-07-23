module.exports = {
  friendlyName: 'Add user ID',

  description: 'Add the user ID to the view context.',

  inputs: {
    req: {
      type: 'ref',
      required: true,
      description: 'The request object.'
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    // Get the userId from the session
    const userId = inputs.req.session.userId;

    // Return an object to merge with the view context
    return exits.success({ userId });
  }
};