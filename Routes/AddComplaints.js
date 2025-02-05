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
 router.post('/addComplaint', async (req, res) => {
    const { Order_id, Customer_id, Complaint_text, Resolution_status } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO public."OrderComplaints" ("Order_id", "Customer_id", "Complaint_text", "Resolution_status") VALUES ($1, $2, $3, $4) RETURNING *',
            [Order_id, Customer_id, Complaint_text, Resolution_status]
        );

        res.status(201).json({ complaint: result.rows[0] });
    } catch (error) {
        console.error('Error adding complaint:', error.message);
        res.status(500).json({ error: 'An error occurred while adding the complaint.' });
    }
});

 
 module.exports = router;

 