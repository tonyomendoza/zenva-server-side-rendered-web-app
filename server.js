const express = require('express');

const home = require('./routes/home'); // Importing the home route

const app = express();

app.use('/', home); // Tell the path to use the route

app.listen(5000);
console.log('App running on http://localhost:5000');