const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


const productsRoute = require('./routes/ProductsFetch'); // For fetching products
const addProductRoute = require('./routes/AddProducts');
const DeleteProductsRoutes = require('./routes/DeleteProduct');
const addcustomerRoutes = require('./routes/AddCustomers');
const FetchCustomerRoutes = require('./routes/FetchCustomer');
const OrdersFetchRoute = require('./routes/OrdersFetch');
const  AddOrdersRoute = require('./routes/AddOrders');
const  LoginUserRoutes = require('./routes/LoginUser');
const  OrderRecivedRoutes = require('./Routes/ViewOrderRecvied');
const  UpdateStatusRoutes = require('./Routes/UpdateStatus');
const  AddReviewRoutes = require('./Routes/AddReview');
const  ViewReviewRoutes = require('./Routes/ViewsFetchReviews');
const  FetchComplaintsRoutes = require('./Routes/FetchComplaints');
const  AddComplaintsRoutes = require('./Routes/AddComplaints');


const app = express();
const port = 3000; // Port where your app will run

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Restrict to your frontend origin
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan('dev'));

// Routes
app.use('/api', productsRoute); // For fetching products
app.use('/api', addProductRoute); // For adding products
app.use('/api', addcustomerRoutes); // For adding products
app.use('/api', DeleteProductsRoutes);
app.use('/api', OrdersFetchRoute);
app.use('/api', FetchCustomerRoutes);
app.use('/api', AddOrdersRoute);
app.use('/api', LoginUserRoutes);
app.use('/api', OrderRecivedRoutes);
app.use('/api', UpdateStatusRoutes);
app.use('/api', AddReviewRoutes);
app.use('/api', ViewReviewRoutes);
app.use('/api', FetchComplaintsRoutes);
app.use('/api', AddComplaintsRoutes);


// Default route for testing
app.get('/', (req, res) => {
    res.send('API is running!');
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
