const mongoose = require('mongoose');

/**
 * Connect to MongoDB. Exits the process on failure so the container
 * restarts cleanly rather than silently running without a database.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected:', mongoose.connection.host);
}

module.exports = connectDB;
