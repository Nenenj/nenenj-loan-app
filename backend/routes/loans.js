const express = require('express');
const Loan = require('../models/loan');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: 'Access denied, no token provided' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the decoded user info to the request
        next();
    } catch (error) {
        res.status(403).send({ error: 'Invalid token' });
    }
}

// Apply for a Loan
router.post('/apply', authenticateToken, async (req, res) => {
    try {
        const { amount, duration, purpose } = req.body;

        // Validate input
        if (!amount || !duration || !purpose) {
            return res.status(400).send({ error: 'All fields are required: amount, duration, purpose' });
        }

        // Create and save loan application
        const loan = new Loan({
            userId: req.user.id,
            amount,
            duration,
            purpose
        });
        await loan.save();

        res.status(201).send({ message: 'Loan application submitted successfully' });
    } catch (error) {
        console.error('Loan application error:', error);
        res.status(400).send({ error: 'Error applying for loan' });
    }
});

// Get Loans for a User
router.get('/user-loans', authenticateToken, async (req, res) => {
    try {
        const loans = await Loan.find({ userId: req.user.id });

        // Check if the user has any loans
        if (loans.length === 0) {
            return res.status(404).send({ message: 'No loans found for this user' });
        }

        res.send(loans);
    } catch (error) {
        console.error('Error fetching loans:', error);
        res.status(500).send({ error: 'Error fetching loans' });
    }
});

module.exports = router;
