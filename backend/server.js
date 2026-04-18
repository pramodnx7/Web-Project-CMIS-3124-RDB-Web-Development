const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');

// Import routes
const personnelRoutes = require('./routes/personnelRoutes');
const contactRoutes = require('./routes/contactRoutes');
const careerRoutes = require('./routes/careerRoutes');
const serviceAlertRoutes = require('./routes/serviceAlertRoutes');
const branchRoutes = require('./routes/branchRoutes');
const loanProductRoutes = require('./routes/loanProductRoutes');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const savingsProductRoutes = require('./routes/savingsProductRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const awardRoutes = require('./routes/awardRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the frontend static files
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api/personnel', personnelRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/alerts', serviceAlertRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/loan-products', loanProductRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/savings-products', savingsProductRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/awards', awardRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'RDB Backend API is running', timestamp: new Date() });
});

// Redirect root to frontend page so relative links resolve correctly
app.get('/', (req, res) => {
    res.redirect('/HTML/frontend.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/health`);
    console.log(`Admin: http://localhost:${PORT}/HTML/admin.html`);
});
