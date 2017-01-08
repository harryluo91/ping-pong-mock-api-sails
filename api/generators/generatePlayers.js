var async = require('async');
/*
	globals
    Player:true
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

var generatePlayers = function() {
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