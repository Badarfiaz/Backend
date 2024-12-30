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
router.post('/addReview', async (req, res) => {
    const {
        Product_id,
        Customer_id,
        Rating,
        Comment
    } = req.body;

    const query = `
        INSERT INTO public."Reviews" (
            "Product_id", "Customer_id", "Rating", "Comment"
        ) VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const values = [Product_id, Customer_id, Rating, Comment];

    try {
        const result = await pool.query(query, values);
        res.status(201).json({ message: 'Review added successfully', review: result.rows[0] });
    } catch (error) {
        console.error('Error inserting review:', error);
        res.status(500).json({ error: 'An error occurred while adding the review.' });
    }
});

module.exports = router;