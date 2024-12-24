 // JavaScript: Express route for inserting customer data
const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

// Set up PostgreSQL connection
const pool = new Pool({
    user: 'postgres',           // Your PostgreSQL username
    host: 'localhost',          // Your database host (localhost for local)
    database: 'EnchantByReem',  // Database name
    password: 'Qwerty',         // Your PostgreSQL password
    port: 5432,                 // PostgreSQL port
});
router.post('/addCustomer', async (req, res) => {
    const { first_name, last_name, email, phone_number, address , city } = req.body;
    console.log('Received data:', req.body); // Debugging
    
    const query = `
        INSERT INTO public."customers" ("first_name", "last_name", "email", "phone_number", "address" , city)
        VALUES ($1, $2, $3, $4, $5 ,$6) RETURNING *;
    `;
    const values = [first_name, last_name, email, phone_number, address , city];

    try {
        const result = await pool.query(query, values);
        console.log('Query result:', result.rows[0]); // Debugging
        res.status(201).json({ message: 'Customer added successfully', customer: result.rows[0] });
    } catch (error) {
        console.error('Error inserting customer:', error);
        res.status(500).json({ error: 'An error occurred while adding the customer.' });
    }
});

module.exports = router;
