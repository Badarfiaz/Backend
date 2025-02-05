const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
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