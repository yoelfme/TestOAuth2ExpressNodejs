var environment = process.env.ENV || 'development';
var config = {
    development: require('./development'),
    test: require('./test')
};

module.exports = config[environment];