const express = require('express');
const connectDB = require('./db');
const User = require('./models/user');
const Loan = require('./models/Loan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/apply-loan', async (req, res) => {
    try {
        const { userId, amount, interest } = req.body;
        const loan = new Loan({ userId, amount, interest });
        await loan.save();
        res.status(201).json({ message: 'Loan application successful', loan });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
