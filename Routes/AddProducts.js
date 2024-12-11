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

// Define the route to add a new product
router.post('/addProduct', async (req, res) => {
    const {
        Title,
        Description,
        Price,
        Category,
        img,
        quantity,
        img2,
        img3,
        img4
    } = req.body;

    const query = `
        INSERT INTO public."Products" (
            "Title", "Description", "Price", "Category", "img", "quantity", "img2", "img3", "img4"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
    `;

    const values = [Title, Description, Price, Category, img, quantity, img2, img3, img4];

    try {
        const result = await pool.query(query, values);
        res.status(201).json({ message: 'Product added successfully', product: result.rows[0] });
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500).json({ error: 'An error occurred while adding the product.' });
    }
});

module.exports = router;
