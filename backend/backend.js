const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./models/connection');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
connectDB();

// Models
const User = require('./models/User');
const Admin = require('./models/Admin');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.ALLOW_FRONT_END_APP_URL, // Update with your frontend domain
  credentials: true, // If cookies are required
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg and .png formats are allowed!'), false);
    }
  },
});

// Middleware to authenticate using JWT
function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes


app.post('/api/users', upload.single('userimage'), async (req, res) => {
  const { username, userid, cardno, StudenNO, category, issueDate, endDate } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userid });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this ID already exists' });
    }

    

    // Create new user
    const newUser = new User({
      username,
      userid,
      cardno,
      StudenNO,
      category, // Store category as a reference to the Category model
      userimage: req.file ? req.file.filename : null,
      issueDate,
      endDate,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


// Route to update user data
// Route to get user data
app.get('/api/users/:searchId/:selectedCategory', async (req, res) => {
  const { searchId, selectedCategory } = req.params;
  try {
    // Match the 'userid' field with 'searchId' and the 'category' field with 'selectedCategory'
    const user = await User.findOne({ userid: searchId, category: selectedCategory });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update user data
app.put('/api/users/:userId/:category', async (req, res) => {
  const { userId, category } = req.params; // Route params
  const updateData = req.body; // Data to update from the request body
  try {
    // Ensure 'userid' and 'category' are correctly matched
    const user = await User.findOneAndUpdate(
      { userid: userId, category: category }, // Match fields with the user schema
      updateData,
      { new: true } // Return the updated document
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});








// Route to get all users
app.get('/api/allusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});




//  Admin Registration Route
// Registration Route
app.post('/api/register', async (req, res) => {
  const username = "Info@tuvnorth.com";
  const password = "@tuvnorth7790@";
  // Check if the user already exists
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already taken' });
    }


    // Create a new admin with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      password: hashedPassword
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register. Please try again.' });
  }
  res.send("Welcome");
});


// Admin Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const user = await Admin.findOne({ username });
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Confirm JWT_SECRET is loaded
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in the environment variables.');
      return res.status(500).json({ error: 'Server error: secret key missing' });
    }

    // Create token and set as cookie
    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful, redirecting to dashboard' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});






// Start the server
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
