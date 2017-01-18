var async = require('async');

var getPlayerDetails = function(data, resolve, reject, cb) {
    var promises = [];
    data.matches.forEach(function(match) {
        promises.push(
            new Promise(function(res) {
                Player.findOne({
                    id: match.playerOne
                }).populate('matches').exec(function(errOne, playerOne) {
                    if (!errOne && playerOne) {
                        match.playerOne = playerOne;
                        Player.findOne({
                            id: match.playerTwo
                        }).populate('matches').exec(function(errTwo, playerTwo) {
                            if (!errTwo && playerTwo) {
                                match.playerTwo = playerTwo;
                                res();
                            } else {
                                reject(errTwo);
                            }
                        })
                    } else {
                        reject(errOne);
                    }
                })
            })
        )
    });
    Promise.all(promises).then(function() {
        resolve(data.matches);
        cb(null, true);
    }).catch(function(err) {
        reject(err);
    })
}

var getPlayersHelper = function(data) {
    return new Promise(function (resolve, reject) {
        async.waterfall([
            function(callback) {
                callback(null, data, resolve, reject);
            },
            getPlayerDetails
        ])
    })
}

module.exports = {
	getPlayersHelper: getPlayersHelper,
};
