require('dotenv').config();

console.log(process.env);

// requires and imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const auth = require('./config/auth')(passport) //Import auth.js

// Import routes
const home = require('./routes/home'); // Importing the home route
const register = require('./routes/register'); //Importing the register route
const login = require('./routes/login');
const account = require('./routes/account') //Import the account route
const admin = require('./routes/admin')

// Initialize App
const app = express();
app.use(session({
    secret: 'awehfuilawef',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Set the render engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// Tell express where to find static assets
app.use(express.static(path.join(__dirname, 'public')));
// Tell express to parse JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((err, req, res, next) => {
    console.log('ERROR: ' + err);
    res.render('error', {message: err.message});
  })

// Set routes
app.use('/', home);
app.use('/register', register);
app.use('/login', login);
app.use('/account', account);
app.use('/admin', admin);

mongoose.connect('mongodb://localhost/zenva-server-store', (err, data) => {
  if (err){
    console.log('DB Connection Failed');
    return;
  }
  console.log('DB Connection Success');
  // Start App
  app.listen(5000);
  console.log('App running on http://localhost:5000');
})