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
        playerOnePoints: 11,
        playerTwoPoints: 8, 
    },
    {
        playerOnePoints: 11,
        playerTwoPoints: 6,
    }
]

var sailsLoader = function(cb) {
    return new Promise(function(resolve, reject) {
        require('sails').load(function(err, sails) {
            if (!err && sails) {
                cb(sails);
            } else {
                sails.log('Error loading sails context.');
                reject(err);
            }
        })
    })
}

var clearData = function(sails, cb) {
    Player.destroy({}).exec(function(destroyErr) {
        if (!destroyErr) {
            cb(sails);
        };
    });
};

var generatePlayers = function(sails, cb) {
    var tasks = [];
    return new Promise(function(parentResolve, parentReject) {
        require('sails').load(function(err, sails) {
            if (err) {
                sails.log('Error loading sails context.');
                process.exit(1);
            }

            var clearData = function(cb) {
                Player.destroy({}).exec(function(destroyErr) {
                    if (!destroyErr) {
                        cb(null);
                    };
                });
            };

            var buildPlayers = function(cb) {
                var builders = [];
                PLAYERS.forEach(function(player) {
                    builders.push(
                        new Promise (function(resolve, reject) {
                            Player.create({
                                firstName: player.firstName,
                                lastName: player.lastName,
                                ranking: player.ranking,
                            }).exec(function(createPlayerErr, createdPlayer) {
                                if (!createPlayerErr && createdPlayer) {
                                    createdPlayer.
                                    resolve(); 
                                } else {
                                    reject();
                                }
                            })
                        })
                    );
                });
                Promise.all(builders).then(function() {
                    cb(null);
                })
            }

            async.series([clearData, buildPlayers], function(runTasksErr, result) {
                if (runTasksErr) {
                    sails.log('Error creating players' + runTasksErr);
                    parentReject(runTasksErr);
                } else {
                    sails.log('Players created');
                    parentResolve(result);
                }
            });
        });
    });
}

var generateMatches = function() {
    var task = [];

}

if (require.main === module) {
    generatePlayers().then(function(res) {
        process.exit(0);
    }).catch(function(err) {
        console.log(err);
        process.exit(1);
    });
}

module.exports = {
    generatePlayers: generatePlayers
};