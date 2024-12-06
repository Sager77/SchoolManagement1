const mongoose = require('mongoose');
require('dotenv').config();

 async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/persondb');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  cardno: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  StudenNO: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  userimage: {
    type: String,
    trim: true,
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: function () {
      let date = new Date();
      date.setFullYear(date.getFullYear() + 1); // Set default endDate to one year from issueDate
      return date;
    },
  },
});

module.exports = mongoose.model('User', userSchema);

