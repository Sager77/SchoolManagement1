const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userid: { type: String, required: true, unique: true }, // userid must remain unique
  cardno: { type: String, default: null }, // Removed 'unique' constraint
  StudenNO: { type: String }, // Removed 'unique' constraint
  category: { type: String, required: true },
  userimage: { type: String },
  certificate: { type: String },
  issueDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

// Export User Model
module.exports = mongoose.model('User', userSchema);
