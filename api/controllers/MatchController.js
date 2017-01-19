/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*
	globals
    Player
    Match
	Promise
*/

var getAllMatches = function(req, res) {
    Match.find().populate('playerOne').populate('playerTwo').exec(function(err, matches) {
      if (!err && matches) {
          return res.json(
                200,
                {data: matches}
            ); 
      } else {
            return res.json(
                404,
                err
            )
        }  
    })
}

var getPlayerMatches = function(req, res) {
    var playerId = req.params.playerId;
    Match.find({
        or : [
            { playerOne: playerId },
            { playerTwo: playerId }
        ]
    })
    .populate('playerOne').populate('playerTwo').populate('players').exec(function(err, matches) {
        if (!err && matches) {
            return res.json(
                200,
                {data: matches}
            );
        } else {
            return res.json(
                404,
                err
            )
        }
    })
}

var editMatchScores = function(req, res) {
    var matchId = req.params.matchId;
    Match.update({
        id: matchId
    }, {
        playerOnePoints: req.body.playerOnePoints,
        playerTwoPoints: req.body.playerTwoPoints
    }).exec(function(err, match) {
        if (!err && match) {
            return res.json(
                200,
                match
            )
        } else {
            return res.json(
                404,
                err
            )
        }
    })
}

module.exports = {
	getPlayerMatches: getPlayerMatches,
    getAllMatches: getAllMatches,
    editMatchScores: editMatchScores
};

