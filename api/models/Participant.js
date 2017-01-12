/**
 * Participants.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      playerId: {
          type: 'string',
          requried: true
      },
      firstName: {
          type: 'string',
          requried: true
      },
      lastName: {
          type: 'string',
          requried: true
      },
      match: {
          model: 'match',
          required: true
      }
  }
};

