var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = module.exports;
var authorizedClientIds = ['papers3', 'test'];

var OAuthClientsSchema = new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUri: { type: String }
});

mongoose.model('OAuthClients', OAuthClientsSchema);

var OAuthClientsModel = mongoose.model('OAuthClients');

model.getClient = function (clientId, clientSecret, callback) {
  console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
  if (clientSecret === null) {
    return OAuthClientsModel.findOne({ clientId: clientId }, callback);
  }
  OAuthClientsModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
};

// This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
// it gives an example of how to use the method to resrict certain grant types
model.grantTypeAllowed = function (clientId, grantType, callback) {
  console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');

  if (grantType === 'password') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
  }

  callback(false, true);
};

model.register = function(data, callback) {
  OAuthClientsModel.create(data, callback);  
}