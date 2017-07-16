var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dust = require('express-dustjs');
var index = require('./routes/index');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('dust', dust.engine({
	useHelpers: true
}));
app.set('view engine', 'dust');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

module.exports = app;
