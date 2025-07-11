const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/UserModel");
const SECRET_KEY = process.env.SECRET_KEY;
const Profile = require("../models/profile.Model")
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already registered with this email' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

  
    const newProfile = new Profile({
      userId: savedUser._id,
      image: '', 
    });
    const savedProfile = await newProfile.save();

    return res.status(201).json({
      success: true,
      message: 'User registered successfully & profile created',
      data: {
        user: {
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
        },
        profile: savedProfile
      }
    });
  } catch (error) {
    console.error('Registration Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '2h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
}