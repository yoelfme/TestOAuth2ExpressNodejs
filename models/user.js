var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var model = module.exports;

var OAuthUsersSchema = new Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  password_reset_token: { type: String, unique: true },
  reset_token_expires: Date,
  firstname: String,
  lastname: String
});

mongoose.model('OAuthUsers', OAuthUsersSchema);

var OAuthUsersModel = mongoose.model('OAuthUsers');

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/*
 * Required to support password grant type
 */
model.getUser = function (email, password, callback) {
      console.log('in getUser (email: ' + email + ', password: ' + password + ')');
      var hashed_password = hashPassword(password);
      OAuthUsersModel.findOne({ email: email }, function(err, user) {
        if(err || !user) return callback(err);
        callback(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
      });
};

model.register = function(fields, callback) {
  var user;

  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;

  user = new OAuthUsersModel(fields);
  user.save(callback);
};
