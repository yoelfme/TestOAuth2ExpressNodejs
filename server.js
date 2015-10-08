var express = require('express');
var bodyParser = require('body-parser');
var oauthServer = require('oauth2-server');
var mongoose = require('mongoose');

var app = express()
var uristring = 'mongodb://localhost/oauth2db';

// Configure connection to database
// Makes connection asynchronously. Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

// Configuration of POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Configure OAuth with MongoDB
app.oauth = oauthServer({
    model: require('./app/models'),
    grants: ['password'],
    debug: true
});

// Configure routes
app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
    res.send('Secret area');
});

// Configure middleware
app.use(app.oauth.errorHandler());

// Configure server to listen at port 3000
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('The server is listening at http://%s:%s', host, port);
})