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
    const client = await pool.connect();  // Connect to the PostgreSQL client

    try {
        // Start a transaction
        await client.query('BEGIN');
    
        // Step 1: Delete product reviews
        await client.query(
          'DELETE FROM public."Reviews" WHERE "Product_id" = $1',
          [id]
        );
    
        // Step 2: Delete orders that reference the product
        await client.query(
          'DELETE FROM public."Orders" WHERE "Product_id" = $1',
          [id]
        );
    
        // Step 3: Delete order complaints related to orders containing the product
        await client.query(
          'DELETE FROM public."OrderComplaints" WHERE "Order_id" IN (SELECT "Order_id" FROM public."Orders" WHERE "Product_id" = $1)',
          [id]
        );
    
        // Step 4: Delete the product itself
        await client.query(
          'DELETE FROM public."Products" WHERE "id" = $1',
          [id]
        );
    
        // Commit the transaction
        await client.query('COMMIT');
    
        res.status(200).json({ message: 'Product and related data deleted successfully' });
    } catch (error) {
        // Rollback the transaction in case of an error
        await client.query('ROLLBACK');
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    } finally {
        client.release();  // Release the client back to the pool
    }
});

module.exports = router;
