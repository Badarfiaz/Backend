const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const productsRoute = require('./routes/ProductsFetch'); // For fetching products
const addProductRoute = require('./routes/AddProducts');

const app = express();
const port = 3000; // Port where your app will run

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', productsRoute); // For fetching products
app.use('/api', addProductRoute); // For adding products

// Default route for testing
app.get('/', (req, res) => {
    res.send('API is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
