var async = require('async');
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

var removeMatchRecord = function(playerId, cb) {
    Player.findOne({
        id: playerId
    }).exec(function(err, player) {
        if (!err && player) {
            Match.destroy({
                or : [
                    { playerOne: player.id },
                    { playerTwo: player.id }
                ]
            }).exec(function(destroyErr) {
                if (!destroyErr) {
                    cb(null, playerId);
                } else {
                    cb(destroyErr);
                }
            })
        } else {
            cb(err);
        }
    })
}

var removePlayerRecord = function(playerId, cb) {
    Player.destroy({
        id: playerId,
    }).exec(function(err) {
        if (!err) {
            cb(null);
        } else {
            cb(err);
        }
    })
}

var deletePlayer = function(req, res) {
    var playerId = req.params.playerId;
    async.waterfall([
        function(callback) {
            callback(null, playerId);
        },
        removeMatchRecord,
        removePlayerRecord
    ],
    function(runTasksErr) {
        if (!runTasksErr) {
            return res.json(
                200,
                'Player destroyed'
            )
        } else {
            return res.json(
                400,
                runTasksErr
            )
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

