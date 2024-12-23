const mongoose = require('mongoose');
require('dotenv').config();

 async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userid: { type: String, required: true, unique: true },
  cardno: { type: String, required: true },
  StudenNO: { type: String, required: true },
  category: { type: String, required: true },
  userimage: { type: String },
  certificate: { type: String },
  issueDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});


module.exports = mongoose.model('User', userSchema);

