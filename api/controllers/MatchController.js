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

var getMatches = function(req, res) {
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

module.exports = {
	getMatches: getMatches
};

