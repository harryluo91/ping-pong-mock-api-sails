/**
 * Match.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    playerOne: {
        model: 'player',
        required: true
    },
    playerTwo: {
        model: 'player',
        required: true
    },
    playerOnePoints: {
        type: 'string'
    },
    playerTwoPoints: {
        type: 'string'
    },
    players: {
        collection: 'player',
        via: 'matches'
    }
  }
};

