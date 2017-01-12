var async = require('async');
/*
	globals
    Player:true
    Match:true
    Promise: true
*/

const PLAYERS = [
    {
        firstName: 'Kobe',
        lastName: 'Bryant',
        ranking: '1'
    },
    {
        firstName: 'Lebron',
        lastName: 'James',
        ranking: '2'
    }
];

const MATCHES = [
    {
        playerOne: 'Kobe',
        playerTwo: 'Lebron',
        playerOnePoints: 11,
        playerTwoPoints: 8, 
    },
    {
        playerOne: 'Kobe',
        playerTwo: 'Lebron',
        playerOnePoints: 11,
        playerTwoPoints: 6,
    }
]

var sailsLoader = function(cb) {
    require('sails').load(function(err, sails) {
        if (!err && sails) {
            cb(null, sails);
        } else {
            console.log('Error loading sails context.');
            cb(err);
        }
    })
}

var clearData = function(sails, cb) {
    Player.destroy({}).exec(function(destroyErr) {
        if (!destroyErr) {
            cb(null, sails);
        } else {
            cb(destroyErr)
        }
    });
};

var generatePlayers = function(sails, cb) {
    var playerBuilders = [];
    PLAYERS.forEach(function(player) {
        playerBuilders.push(
            new Promise (function(resolve, reject) {
                Player.create({
                    firstName: player.firstName,
                    lastName: player.lastName,
                    ranking: player.ranking,
                }).exec(function(createPlayerErr, createdPlayer) {
                    if (!createPlayerErr && createdPlayer) {
                        resolve(); 
                    } else {
                        reject();
                    }
                })
            })
        );
    });
    Promise.all(playerBuilders).then(function() {
        cb(null, sails);
    }).catch(function(err) {
        cb(err);
    })
}

var generateMatches = function(sails, cb) {
    var matchBuilders = [];
    MATCHES.forEach(function(match) {
        matchBuilders.push(
            new Promise (function(resolve, reject) {
                var firstPlayer;
                var secondPlayer;
                Player.findOne({
                    firstName: match.playerOne
                }).exec(function(err, player) {
                    if (!err && player) {
                        firstPlayer = player;
                        Player.findOne({
                            firstName: match.playerTwo
                        }).exec(function(err2, player2) {
                            if (!err2 && player2) {
                                Match.create({
                                    playerOne: player,
                                    playerTwo: player2,
                                    playerOnePoints: match.playerOnePoints,
                                    playerTwoPoints: match.playerTwoPoints
                                }).exec(function(createMatchErr, createdMatch) {
                                    if (!createMatchErr && createdMatch) {
                                        sails.log(createdMatch)
                                        resolve();
                                    } else {
                                        reject(createMatchErr);
                                    }
                                })
                            } else {
                                reject(err2)
                            }
                        })
                    } else {
                        reject(err);
                    }
                });
            })
        )
    });
    Promise.all(matchBuilders).then(function() {
        cb(null);
    }).catch(function(err) {
        cb(err);
    })
}

if (require.main === module) {
    async.waterfall([sailsLoader, clearData, generatePlayers, generateMatches], function(runTasksErr, result) {
        if (!runTasksErr) {
            process.exit(0);
        } else {
            console.log(runTasksErr);
            process.exit(1);
        }
    })
}

module.exports = {
    generatePlayers: generatePlayers
};