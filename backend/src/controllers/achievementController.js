// controllers/achievementController.js
const mongoose = require('mongoose');
const Achievement = require('../models/achievementModel');

// Get all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().populate('issued_to');
    res.status(200).json({ success: true, data: achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single achievement by ID
exports.getAchievementById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid achievement ID format' });
    }
    const achievement = await Achievement.findById(req.params.id).populate('issued_to');
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.status(200).json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new achievement
exports.createAchievement = async (req, res) => {
  try {
    const { name, description, badge_level, issued_to } = req.body;

    // Check for missing required fields
    if (!name || !badge_level || !issued_to) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const achievement = await Achievement.create({ name, description, badge_level, issued_to });
    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ success: false, message: 'Invalid data provided', details: error.errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an achievement by ID
exports.updateAchievement = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid achievement ID format' });
    }

    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('issued_to');

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.status(200).json({ success: true, data: achievement });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ success: false, message: 'Invalid data provided', details: error.errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an achievement by ID
exports.deleteAchievement = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid achievement ID format' });
    }

    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.status(200).json({ success: true, message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
