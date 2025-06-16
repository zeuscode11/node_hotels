const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.DB_URL; // Make sure this key is correct

// Optional config to prevent timeout errors
const options = {
  serverSelectionTimeoutMS: 30000, // wait up to 30s for connection
};

// Connect to MongoDB
function connectToDatabase(app) {
  mongoose.connect(mongoUrl, options)
    .then(() => {
      console.log('✅ Connected to MongoDB');

      // Start the Express server **after DB connection**
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1); // Exit if connection fails
    });

  const db = mongoose.connection;

  db.on('disconnected', () => {
    console.warn('⚠️ Disconnected from MongoDB');
  });

  db.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message);
  });
}

module.exports = connectToDatabase;
