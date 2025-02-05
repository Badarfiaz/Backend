const express = require('express');
const { Pool } = require('pg');

// Create a router
const router = express.Router();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


// Define a route to fetch products
router.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "public"."Products"'); // Adjust the table name as needed
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});

module.exports = router;
