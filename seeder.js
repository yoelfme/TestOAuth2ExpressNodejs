var app = require('./app');
var models = require('./models');

models.User.register({
    email: 'test@ayalo.com',
    password: 'test'
}, function() {
    models.Client.register({
        clientId: 'ayalo1',
        clientSecret: '123',
        redirectUri: '/oauth/redirect'
    }, function() {
        process.exit();
    });
});