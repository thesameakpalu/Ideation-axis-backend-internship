// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailjs = require('emailjs-com');
const User = require('../models/user'); // Ensure you have a User model defined in models/User.js

// Function to send verification email
const sendVerificationEmail = async (userEmail, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const verificationLink = `http://your-frontend-url/verify-email?token=${token}`;

  const templateParams = {
    user_email: userEmail,
    verification_link: verificationLink,
  };

  await emailjs.send(
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    templateParams,
    process.env.EMAILJS_PUBLIC_KEY
  );
};

// Registration function
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Send verification email
    await sendVerificationEmail(email, newUser._id);

    res.status(201).json({ message: "User registered. Please verify your email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Email verification endpoint
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await User.findByIdAndUpdate(userId, { isVerified: true });
    res.status(200).json({ message: "Email verified successfully." });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};
