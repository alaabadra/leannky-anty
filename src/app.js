const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const controller = require('./controller');
const error = require('./controller/error');
require('dotenv').config();

const app = express();
app.set('port', process.env.PORT || 3500);
app.use(cookieParser());
app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, '..', 'public', 'logo.svg')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(controller);
app.use(error.client);
app.use(error.server);

module.exports = app;
