const express = require("express");
const { Pool } = require("pg");

const router = express.Router();

// Set up PostgreSQL connection
const pool = new Pool({
  user: "postgres",           // Your PostgreSQL username
  host: "localhost",          // Your database host (localhost for local)
  database: "EnchantByReem",  // Database name
  password: "Qwerty",         // Your PostgreSQL password
  port: 5432,                 // PostgreSQL port
});
router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    const query = `
        SELECT * 
        FROM public."customers"
        WHERE "first_name" = $1 AND "customer_password" = $2
        LIMIT 1;
    `;

    const values = [name, password];

    try {
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'Login successful',
                customer: result.rows[0], // Return all columns for the customer
            });
        } else {
            res.status(401).json({ error: 'Invalid name or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});


module.exports = router;
