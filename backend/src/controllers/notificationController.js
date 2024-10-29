// controllers/notificationController.js
const Notification = require('../models/notificationModel');

const logger = require("../config/logger");


// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    // Log an informational message at the 'info' level
    // logger.info("This is an info message");

    // Log an error message at the 'error' level
    // logger.error("This is an error message");

    // Log a warning message at the 'warn' level
    // logger.warn("This is a warning message");

    // Log a debug message at the 'debug' level
    // logger.debug("This is a debug message");

    const notifications = await Notification.find();
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { type, message, sent_to } = req.body;
    const notification = await Notification.create({ type, message, sent_to });
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a notification by ID
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
