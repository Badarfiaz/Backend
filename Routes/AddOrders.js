  // JavaScript: Express route for inserting Orders data
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
 router.post('/addOrders', async (req, res) => {
     const { Customer_id,Product_id, quantity, payment_method, total_amount, order_status} = req.body;
     console.log('Received data:', req.body); // Debugging
     
     const query = `
         INSERT INTO public."Orders" ("Customer_id","Product_id", "quantity", "payment_method", "total_amount", "order_status" )
         VALUES ($1, $2, $3, $4, $5 ,$6 ) RETURNING *;
     `;
     const values = [Customer_id ,Product_id, quantity, payment_method, total_amount, order_status];
 
     try {
         const result = await pool.query(query, values);
         console.log('Query result:', result.rows[0]); // Debugging
         res.status(201).json({ message: 'Orders added successfully', Orders: result.rows[0] });
     } catch (error) {
         console.error('Error inserting Orders:', error);
         res.status(500).json({ error: 'An error occurred while adding the Orders.' });
     }
 });
 
 module.exports = router;
 