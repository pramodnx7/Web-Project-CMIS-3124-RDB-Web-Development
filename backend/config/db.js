const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// Use Google DNS to resolve MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.warn('Continuing without database connection. Dynamic API features may not work until MongoDB is reachable.');
        return false;
    }
};

module.exports = connectDB;
