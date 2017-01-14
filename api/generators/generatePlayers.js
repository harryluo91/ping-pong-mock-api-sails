var async = require('async');
// import { PLAYERS, MATCHES } from './initialData/initialData.js';
/*
	globals
    Player:true
    Match:true
    Promise: true
*/

const PLAYERS = [
    {
        firstName: 'Michael',
        lastName: 'Clarke',
        ranking: '1',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/62-1467395065.jpg'
    },
    {
        firstName: 'Kyle',
        lastName: 'Bryce',
        ranking: '2',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/1274-201610061349168047.jpg'
    },
    {
        firstName: 'James',
        lastName: 'O\'Connell',
        ranking: '3',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/51-1467395065.jpg'
    },
    {
        firstName: 'Nikola',
        lastName: 'Kramaric',
        ranking: '4',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/68-1467395065.jpg'
    },
    {
        firstName: 'Kenneth',
        lastName: 'Hou',
        ranking: '5',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/16-1467395065.jpg'
    },
    {
        firstName: 'Jani',
        lastName: 'Tuomi',
        ranking: '6',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/1203-1467395065.jpg'
    },
    {
        firstName: 'Harry',
        lastName: 'Luo',
        ranking: '7',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/1261-1467395065.jpg'
    },
    {
        firstName: 'Mike',
        lastName: 'Hass',
        ranking: '8',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/1360-201611251209287393.jpg'
    },
    {
        firstName: 'Evan',
        lastName: 'Skeete',
        ranking: '9',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/1305-1467395065.jpg'
    },
    {
        firstName: 'Ryan',
        lastName: 'Russell',
        ranking: '10',
        avatar: 'https://eef6f43bd3430e28fae6-ea0c2ccfe9842a2d35335186b2bf66d9.ssl.cf2.rackcdn.com/production/profile-pictures/1228-1467395065.jpg'
    }
];

const MATCHES = [
    {
        playerOne: 'Michael',
        playerTwo: 'Kyle',
        playerOnePoints: 11,
        playerTwoPoints: 8, 
    },
    {
        playerOne: 'Michael',
        playerTwo: 'James',
        playerOnePoints: 11,
        playerTwoPoints: 6,
    },
    {
        playerOne: 'Michael',
        playerTwo: 'Nikola',
        playerOnePoints: 11,
        playerTwoPoints: 9,
    },
    {
        playerOne: 'Michael',
        playerTwo: 'Ryan',
        playerOnePoints: 11,
        playerTwoPoints: 4,
    },
    {
        playerOne: 'Michael',
        playerTwo: 'Kenneth',
        playerOnePoints: 11,
        playerTwoPoints: 8,
    },
    {
        playerOne: 'Kyle',
        playerTwo: 'Evan',
        playerOnePoints: 11,
        playerTwoPoints: 5,
    },
    {
        playerOne: 'Kyle',
        playerTwo: 'James',
        playerOnePoints: 11,
        playerTwoPoints: 9,
    },
    {
        playerOne: 'Kyle',
        playerTwo: 'Harry',
        playerOnePoints: 11,
        playerTwoPoints: 8,
    },
    {
        playerOne: 'Kyle',
        playerTwo: 'Jani',
        playerOnePoints: 11,
        playerTwoPoints: 4,
    },
    {
        playerOne: 'James',
        playerTwo: 'Ryan',
        playerOnePoints: 11,
        playerTwoPoints: 6,
    },
    {
        playerOne: 'James',
        playerTwo: 'Mike',
        playerOnePoints: 11,
        playerTwoPoints: 8,
    },
    {
        playerOne: 'James',
        playerTwo: 'Evan',
        playerOnePoints: 11,
        playerTwoPoints: 5,
    },
    {
        playerOne: 'Nikola',
        playerTwo: 'James',
        playerOnePoints: 11,
        playerTwoPoints: 5,
    },
    {
        playerOne: 'Nikola',
        playerTwo: 'Harry',
        playerOnePoints: 11,
        playerTwoPoints: 8,
    },
    {
        playerOne: 'Nikola',
        playerTwo: 'Mike',
        playerOnePoints: 11,
        playerTwoPoints: 6,
    }
];

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

var clearPlayerData = function(sails, cb) {
    Player.destroy({}).exec(function(destroyErr) {
        if (!destroyErr) {
            cb(null, sails);
        } else {
            cb(destroyErr)
        }
    });
};

var clearMatchData = function(sails, cb) {
    Match.destroy({}).exec(function(destroyErr) {
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
                    avatar: player.avatar
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
    async.waterfall([sailsLoader, clearPlayerData, clearMatchData, generatePlayers, generateMatches], function(runTasksErr, result) {
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