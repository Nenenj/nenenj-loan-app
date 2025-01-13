const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/user');
const router = express.Router();

// Register Endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).send({ error: 'Username, email and password are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).send({ error: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: 'Username or email already taken' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send({ error: 'Error registering user' });
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).send({ error: 'Username and password are required' });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send({ error: 'User not found' });

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send({ error: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.send({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: 'Error logging in' });
    }
});

module.exports = router;
