/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*
	globals
    Player
	Promise
*/

var createPlayer = function(req, res) {
    Player.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).exec(function(err, player) {
        if (!err && player) {
            return res.json(
                200,
                {data: player}
            );
        } else {
            return res.json(404, err);
        }
    })
}

var getPlayers = function(req, res) {
    console.log('test')
    Player.find().exec(function(err, players) {
        if (!err && players) {
            return res.json(200, {
                data: players
            });
        } else {
            console.log(err)
            return res.json(404, err);
        }
    })
}

var getPlayerById = function(req, res) {
    Player.findOne({
        id: req.params.playerId,
    }).exec(function(err, player) {
        if (!err && player) {
            return res.json(
                200,
                {
                    data: player
                }
            )
        } else {
            return res.json(404, err);
        }
    })
}

var editPlayer = function(req, res) {
    var playerId = req.params.playerId;
    Player.update({
        id: playerId
    }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        ranking: req.body.ranking
    }).exec(function(err, player){
        if (!err && player) {
            return res.json(
                200,
                {data: player}
            );
        } else {
            return res.json(404, err);
        }
    });
}

var deletePlayer = function(req, res) {
    var playerId = req.params.playerId;
    Player.destroy({
        id: playerId,
    }).exec(function(err) {
        if (!err) {
            return res.json(200);
        } else {
            return res.json(404, err);
        }
    })
}

module.exports = {
	getPlayers: getPlayers,
    getPlayerById: getPlayerById,
    editPlayer: editPlayer,
    createPlayer: createPlayer,
    deletePlayer: deletePlayer
};

