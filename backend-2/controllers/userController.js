const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const userController = {
  signUp: async (req, res) => {
    try {
      if (!req.body.userName || !req.body.password) {
        return res.status(400).json({ error: 'User Cannot be created' });
      }
      const SALT_ROUNDS = 10;
  
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  
      // Create a new user with the hashed password
      const user = new User({
        userName: req.body.userName,
        password: hashedPassword,
        userType: req.body.userType // Save the hashed password
      });
  
      const savedUser = await user.save();
      const refresh_token = createRefreshToken({id: savedUser});
      return res.status(201).json(refresh_token);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  },

  login: async (req, res) => {
    try {
      console.log(req.body);
  
      // Find the user by username
      const user = await User.findOne({ userName: req.body.userName });
  
      if (!user) {
        return res.status(400).json({ error: 'User Not Found' });
      }
  
      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  
      if (isPasswordValid) {
        const refresh_token = createRefreshToken({id: user});

        return res.status(201).json({ message: 'User Found', data: user, access_token: refresh_token });
      }
  
      return res.status(400).json({ error: 'Invalid Password' });
    } catch (error) {
      return res.status(400).json({ error: 'Could not log in.' });
    }
  },

  getDriverByID: async (req, res) => {
    try {
        
        if (req.user) {
          const user= await User.findById(req.user._id)
          console.log(user)
          return res.json(user);
        } else {
          return res.status(404).json({ error: 'User not found.' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Server error.' });
      }
  },

  updateDriver: async (req, res) => {
    try {
        const user = req.user;
        if (!user){
          return res.status(404).json({ error: 'User not found.' });
        }
        if (req.body.age < 18){
          return res.status(400).json({ error: 'Sorry Your age should be atleast 18 years.' }); 
        }
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          req.body,
          { new: true }
        );
        
        return res.status(200).json(updatedUser);
      } catch (error) {
  
        return res.status(500).json({ error: 'Server error.' });
      }
  }
};

module.exports = userController;
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
      expiresIn: "7d",
  });
};