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
    const { Customer_id,first_name, last_name, email, phone_number, address , city , Customer_Password } = req.body;
    console.log('Received data:', req.body); // Debugging
    
    const query = `
        INSERT INTO public."customers" ("Customer_id","first_name", "last_name", "email", "phone_number", "address" , city , Customer_Password )
        VALUES ($1, $2, $3, $4, $5 ,$6 , $7 ,$8) RETURNING *;
    `;
    const values = [Customer_id ,first_name, last_name, email, phone_number, address , city, Customer_Password];

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
