const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully Connected to Database"))
  .catch(err => console.log("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['user','admin','moderator'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Middleware to fetch user from JWT
const fetchUserType = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, password, type } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(400).json({ message: "User already exists. Please login." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword, type });
    await user.save();

    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ message: "No account found. Please create an account." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const payload = { user: { id: user._id, type: user.type } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful!", token, type: user.type });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Role-based Routes
app.get('/admin', fetchUserType, (req, res) => {
  if (req.user.type === 'admin') return res.json({ success: true });
  res.status(403).json({ success: false });
});

app.get('/moderator', fetchUserType, (req, res) => {
  if (req.user.type === 'moderator') return res.json({ success: true });
  res.status(403).json({ success: false });
});

app.get('/user', fetchUserType, (req, res) => {
  if (req.user.type === 'user') return res.json({ success: true });
  res.status(403).json({ success: false });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on the port ${PORT}`));
