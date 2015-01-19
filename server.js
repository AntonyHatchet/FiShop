// Require express
console.log("Starting up...");
var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var errorhandler = require('errorhandler');
// Set up express
var app = express();
// Require mongostore session storage
//var mongoStore = require('connect-mongo')(expressSession);
var passport = require('passport');
// Require needed files
var database = require('./shop/dbMagic/dbInit.js');
var config = require('./config/config.js')();
var info = require('./package.json');
var bodyParser = require('body-parser');
var converter = require('./lib/converter/converter');
// Set up jade
app.set('views', __dirname + '/shop/views');
app.set('view engine', 'jade');
app.use(cookieParser());
// app.use(express.favicon());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set up sessions
app.use(expressSession({
    // Set up MongoDB session storage
    store: new MongoStore({url:config.mongo.host+config.mongo.port+config.mongo.dbName}),
    // Set session to expire after 21 days
    cookie: { maxAge: new Date(Date.now() + 181440000)},
    // Get session secret from config file
    secret: config.mongo.cookie_secret,
    resave: false,
    saveUninitialized: true
}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Define public assets
app.use(express.static(__dirname + '/shop/public'));

// Connect to database
console.log('Connecting to database...');
database.startup(config.mongo.host+config.mongo.port+config.mongo.dbName);


// Configure Express
//var env = process.env.NODE_ENV || 'development';
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

// Require router, passing passport for authenticating pages
require('./shop/router')(app, passport);

// Listen for requests
app.listen(config.port);
console.log('FiShop v' + info.version + ' listening on port ' + config.port + ' in mode ' + config.mode);

// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});