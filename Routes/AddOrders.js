  // JavaScript: Express route for inserting Orders data
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
 