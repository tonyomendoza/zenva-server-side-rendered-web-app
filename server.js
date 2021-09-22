// requires and imports
const express = require('express');
const path = require('path')

// Import routes
const home = require('./routes/home'); // Importing the home route

// Initialize App
const app = express();

// Set the render engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')

// Tell express where to find static assets
app.use(express.static(path.join(__dirname, 'public')))

// Set routes
app.use('/', home); // Tell the path to use the route

// Start App
app.listen(5000);
console.log('App running on http://localhost:5000');