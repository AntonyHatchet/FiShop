// Require express
var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
// Set up express
var app = express();
// Require mongostore session storage
//var mongoStore = require('connect-mongo')(expressSession);
var passport = require('passport');
// Require needed files
var database = require('./shop/data');
var config = require('./shop/config.json');
var info = require('./package.json');
var bodyParser = require('body-parser');
var converter = require('./lib/converter/converter');
console.log('NodeShop Started!');

// Connect to database
database.startup(config.connection);
console.log('Connecting to database...');

// Configure Express
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {

    app.set('port', process.env.PORT || 3000);
    // Set up jade
    app.set('views', __dirname + '/shop/views');
    app.set('view engine', 'jade');
    app.use(cookieParser());
   // app.use(express.favicon());
    app.use(bodyParser());

    // Set up sessions
    app.use(expressSession({
        // Set up MongoDB session storage
        store: new MongoStore({url:config.connection}),
        // Set session to expire after 21 days
        cookie: { maxAge: new Date(Date.now() + 181440000)},
        // Get session secret from config file
        secret: config.cookie_secret
        }));
    
    // Set up passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Define public assets
    app.use(express.static(__dirname + '/shop/public'));
};
    
// Require router, passing passport for authenticating pages
require('./shop/router')(app, passport);

// Listen for requests
app.listen(3000);

console.log('NodeShop v' + info.version + ' listening on port ' + process.env.PORT);

// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});