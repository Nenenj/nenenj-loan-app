const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ error: 'Token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send({ error: 'Invalid token' });
        req.user = user; // Add user info to request
        next();
    });
};

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Generate a JWT token upon registration
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ error: 'Server error' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send({ error: 'User not found' });

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send({ error: 'Invalid credentials' });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send({ error: 'Server error' });
    }
});

// Protected Route Example
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
        if (!user) return res.status(404).send({ error: 'User not found' });

        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send({ error: 'Server error' });
    }
});

// New Endpoint: Verify Token
router.post('/verify', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ error: 'Token required' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' });

        try {
            const user = await User.findById(decoded.id);
            if (!user) return res.status(404).send({ error: 'User not found' });

            res.status(200).send({
                username: user.username,
                balance: user.balance || 0, // Assuming balance is stored in the user model
            });
        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(500).send({ error: 'Server error' });
        }
    });
});

module.exports = router;