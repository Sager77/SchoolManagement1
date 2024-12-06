const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); // For hashing passwords
require('dotenv').config();

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Admin', adminSchema);
