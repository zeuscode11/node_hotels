const mongoose = require('mongoose');
require('dotenv').config();

//const mongoUrl = process.env.DB_URL_Local;
const mongoUrl = process.env.DB_URL;

// Remove deprecated options
mongoose.connect(mongoUrl)
  .then(() => {
    console.log(' Connected to MongoDB');
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
  });

const db = mongoose.connection;

// Optional: still listen for disconnection if you want
db.on('disconnected', () => {
  console.log(' Disconnected from MongoDB');
});

module.exports = db;
