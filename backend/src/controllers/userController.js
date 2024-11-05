// controllers/userController.js
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firebase_uid, name, email, phone_number, branch, college_joining_year, moodle_id, id_card_image_url, role, status, profile_picture, password } = req.body;

    // Check for missing required fields
    if (!firebase_uid || !name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const user = await User.create({
      firebase_uid,
      name,
      email,
      phone_number,
      branch,
      college_joining_year,
      moodle_id,
      id_card_image_url,
      role,
      status,
      profile_picture,
      password,
    });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ success: false, message: 'Invalid data provided', details: error.errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ success: false, message: 'Invalid data provided', details: error.errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
