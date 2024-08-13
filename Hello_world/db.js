const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = 'mongodb://localhost:27017/hotels'; // Corrected 'Localhost' to 'localhost'
// const mongoURL=process.env.DB_URL;


mongoose.connect(mongoURL, {
    useNewUrlParser: true, // Corrected 'useNewURLParser' to 'useNewUrlParser'
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server'); // Updated message for consistency
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected'); // Corrected 'Moongos' to 'Mongoose'
});

module.exports = db;
