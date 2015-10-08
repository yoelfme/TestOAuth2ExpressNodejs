var mongoose = require('mongoose');
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

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/*
 * Required to support password grant type
 */
model.getUser = function (username, password, callback) {
  console.log('in getUser (username: ' + username + ', password: ' + password + ')');

  OAuthUsersModel.findOne({ username: username, password: password }, function(err, user) {
    if(err) return callback(err);
    callback(null, user._id);
  });
};

model.authenticate = function(email, password, cb) {
  this.findOne({ email: email }, function(err, user) {
    if (err || !user) return cb(err);
    cb(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
  });
};

model.register = function(fields, cb) {
  var user;

  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;

  user = new OAuthUsersModel(fields);
  user.save(cb);
};
