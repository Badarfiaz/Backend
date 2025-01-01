const express = require('express');
const { Pool } = require('pg');

// Create a router
const router = express.Router();

// Set up PostgreSQL connection
const pool = new Pool({
    user: 'postgres',          // Default PostgreSQL user; replace if different
    host: 'localhost',         // Assuming your database is running locally
    database: 'EnchantByReem', // Your database name
    password: 'Qwerty', // Replace with your actual password
    port: 5432,                // Default PostgreSQL port
});


// Define a route to fetch OrderComplaints
router.get('/Complaints', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM order_complaints_view;'); // Adjust the table name as needed
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching OrderComplaints:', error);
        res.status(500).json({ error: 'An error occurred while fetching OrderComplaints.' });
    }
});

module.exports = router;
