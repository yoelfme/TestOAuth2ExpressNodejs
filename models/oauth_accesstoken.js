var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = module.exports;

var OAuthAccessTokensSchema = new Schema({
  accessToken: { type: String },
  clientId: { type: String },
  userId: { type: String },
  expires: { type: Date }
})

mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);

var OAuthAccessTokensModel = mongoose.model('OAuthAccessTokens');

model.getAccessToken = functio(bearerToken, callback) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

    OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
}

model.saveAccessToken = function (token, clientId, expires, userId, callback) {
  console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

  var accessToken = new OAuthAccessTokensModel({
    accessToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  accessToken.save(callback);
};