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
