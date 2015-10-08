var config = require('./../config');
var mongoose = require('mongoose');

mongoose.connect(config.db, function(err, res) {
    if(err) {
        console.log('ERROR connecting to: ' + config.db + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + config.db)
    }
});

module.exports.oauth = require('./oauth');
module.exports.User = require('./user');
module.exports.mongoose = mongoose;
