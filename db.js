const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/Hotel';

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
