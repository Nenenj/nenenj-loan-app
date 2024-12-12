const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan'); // Assuming the model is in the `models` folder

// Apply for Loan
router.post('/apply', async (req, res) => {
    try {
        const { userId, amount, interest } = req.body;
        const loan = new Loan({ userId, amount, interest });
        await loan.save();
        res.status(201).json({ message: 'Loan application successful', loan });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Fetch Loans
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const loans = await Loan.find({ userId });
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;