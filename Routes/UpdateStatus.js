const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
// Update Order Status
router.post('/UpdateStatus', async (req, res) => {
  const { Customer_id } = req.query; // Extract from URL query
  const { order_status } = req.body; // Extract from POST body

  if (!Customer_id) {
    return res.status(400).json({ error: 'Customer_id is missing.' });
  }

  try {
    // Update the order in the database
    const result = await pool.query(
      `
      UPDATE public."Orders" 
      SET "order_status" = $1 
      WHERE "Customer_id" = $2;
      `,
      [order_status, Customer_id]
    );

    if (result.rowCount > 0) {
      res.json({ message: 'Order status updated successfully.' });
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
