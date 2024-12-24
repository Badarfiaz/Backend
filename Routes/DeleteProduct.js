const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'EnchantByReem',
    password: 'Qwerty',
    port: 5432,
});

// DELETE a product by ID
router.delete('/deleteProduct/:id', async (req, res) => {
    console.log('Delete endpoint hit');
    console.log(`Request Params:`, req.params);
    console.log('Delete request received for ID:', req.params.id);

    const { id } = req.params;

    try {
        console.log(`Attempting to delete product with ID: ${id}`);

        const result = await pool.query(
            'DELETE FROM public."Products" WHERE id = $1',
            [id]
        );

        if (result.rowCount === 0) {
            console.error(`No product found with ID: ${id}`);
            return res.status(404).json({ error: 'Product not found' });
        }

        console.log(`Product with ID ${id} successfully deleted`);
        res.status(204).send(); // No content
    } catch (err) {
        console.error('Error deleting product:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
