const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const productsRoute = require('./routes/ProductsFetch'); // Correctly import the route

const app = express();
const port = 3000; // Use the port you want to run the app on

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Add the products route
app.use('/api', productsRoute); // '/api' is the prefix

// Default route for testing
app.get('/', (req, res) => {
    res.send('API is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
