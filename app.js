var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var handleRequest = require('./routes/handleRequest');
var handleRegistration = require('./handler/handleRegistration');
var mondb = require('./mondb');
var handleLogin = require('./handler/handleLogin');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'kejfkejfklejfwlefjkfjwölfj',
  resave: false,
  saveUninitialized: false
}));

var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

mondb.connect(mongoose);
var User = mondb.makeModelUser(mongoose);


handleRequest(app);
handleRegistration(app, urlencodedParser, User);
handleLogin(app, urlencodedParser, User);

app.listen(8000);
