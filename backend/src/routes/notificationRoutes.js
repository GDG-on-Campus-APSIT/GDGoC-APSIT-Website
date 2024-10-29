// routes/notificationRoutes.js
const express = require('express');
const {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} = require('../controllers/notificationController');

const router = express.Router();

router.route('/')
  .get(getAllNotifications)    // GET /notifications - Get all notifications
  .post(createNotification);    // POST /notifications - Create a new notification

router.route('/:id')
  .get(getNotificationById)     // GET /notifications/:id - Get a single notification by ID
  .put(updateNotification)      // PUT /notifications/:id - Update a notification by ID
  .delete(deleteNotification);  // DELETE /notifications/:id - Delete a notification by ID

module.exports = router;
