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
        cb(null, sails);
    }).catch(function(err) {
        cb(err);
    })
}

if (require.main === module) {
    async.waterfall([sailsLoader, clearData, generatePlayers], function(runTasksErr, result) {
        if (!runTasksErr) {
            Player.find().exec(function(err, res) {
                if (!err && res) {
                    console.log(res);
                    process.exit(0);
                }
            });
            
        } else {
            console.log(runTasksErr);
            process.exit(1);
        }
    })
}

module.exports = {
    generatePlayers: generatePlayers
};