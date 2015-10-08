var express = require('express');
var bodyParser = require('body-parser');
var oauthServer = require('oauth2-server');
var path = require('path');

var models = require('./models');
var config = require('./config');

var app = express()
app.locals.title = 'OAuth Example';
app.locals.pretty = true;

// Configure environment and PORT
app.set('env', process.env.ENV || 'development');
app.set('port', process.env.PORT || 3000);

// Configuration of POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Configure OAuth with MongoDB
app.oauth = oauthServer({
    model: models.oaut,
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

module.exports = app;