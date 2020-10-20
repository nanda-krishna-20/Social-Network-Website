const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const initializePassport = require('../config/passport-config');
const db = require('../models/index');
require('dotenv').config();

// Importing route handler files
const homeRoute = require('../routes/home');
const loginRoute = require('../routes/login');
const signUpRoute = require('../routes/signUp');

const app = express();

// Initializing passport
initializePassport(passport, db);

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: process.env.ONE_DAY,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// Route handlers
app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/signup', signUpRoute);

const { PORT = 8000, HOST } = process.env;

app.listen(PORT, HOST, () => {
  console.log(`Server running on port: ${HOST}:${PORT}`);
});
