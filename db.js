// backend/db.js
const mongoose = require('mongoose');

// Use environment variable or fallback to your hardcoded URI (recommended to use env vars)
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://roi_admin:admin@cluster0.afrqskv.mongodb.net/roi_simulator?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB with options
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection event handlers
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

module.exports = mongoose;
