var AccessToken = require('./oauth_accesstoken');
var RefreshToken = require('./oauth_refreshtoken');
var Client = require('./oauth_client');
var User = require('./user');

// Funtions for node-oauth2-server API
module.exports.getAccessToken = AccessToken.getAccessToken;
module.exports.saveAccessToken = AccessToken.saveAccessToken;
module.exports.saveRefreshToken = RefreshToken.saveRefreshToken;
module.exports.getRefreshToken = RefreshToken.getRefreshToken;
module.exports.getClient = Client.getClient;
module.exports.grantTypeAllowed = Client.grantTypeAllowed;
module.exports.getUser = User.getUser;