const express = require('express');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../models/auth.js');
const secretKey = process.env.JWT_SECRET;


// user register
router.post('/register', async (req, res) => {
  try {
      const { userName, password, address, firstName, lastName, email } = req.body;
      
      if (!userName) throw new Error('UserName is required');
      if (!password) throw new Error('Password is required');
      if (!address) throw new Error('Address is required');
      if (!firstName) throw new Error('First Name is required');
      if (!lastName) throw new Error('Last Name is required');
      if (!email) throw new Error('Email is required');
      
      // Check if the user already exists
      const existingUser = await auth.findOne({userName});
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const result = await auth.create({userName, password: hashedPassword, address, firstName, lastName, email});
      res.status(201).json({
          account: result,
          message: 'Registration successful'
      });
  } catch (error) {
      res.status(500).json({
          message: error.message || 'Registration unsuccessful'
      });
  }
});


// user login
router.post('/login', async (req, res) => {
  try {
      const { userName, password } = req.body;

      if (!userName || !password) {
          return res.status(400).json({ message: 'UserName and Password are required' });
      }

      const user = await auth.findOne({ userName });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

      res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
      res.status(500).json({ message: error.message || 'Login unsuccessful' });
  }
});

// user logout
router.post('/logout', (req, res) => {
  try {
    res.status(200).json({message: 'Logout successful'});
  } catch (error) {
    res.status(500).json({message: 'Logout unsuccess'})
  }
})
module.exports = router; 
