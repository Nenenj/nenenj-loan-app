require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const loanRoutes = require('./routes/loans');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // For parsing JSON in request body
app.use(express.urlencoded({ extended: true })); // parsing URL-encoded data
app.use(express.static('public')); // serving static files

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Nenenj Loan App!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
