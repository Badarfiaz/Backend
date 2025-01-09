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

// DELETE a product by Customer_id
router.delete('/DeleteCustomers/:Customer_id', async (req, res) => {
    console.log('Delete endpoint hit');
    console.log(`Request Params:`, req.params);
    console.log('Delete request received for Customer_id:', req.params.Customer_id);

    const { Customer_id } = req.params;

    try {
        console.log(`Attempting to delete customers with Customer_id: ${Customer_id}`);

        const result = await pool.query(
            'DELETE FROM public."customers" WHERE Customer_id = $1',
            [Customer_id]
        );

        if (result.rowCount === 0) {
            console.error(`No product found with Customer_id: ${Customer_id}`);
            return res.status(404).json({ error: 'Product not found' });
        }

        console.log(`Product with Customer_id ${Customer_id} successfully deleted`);
        res.status(204).send(); // No content
    } catch (err) {
        console.error('Error deleting product:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
