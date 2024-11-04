// routes/attendanceRoutes.js
const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const router = express.Router();

router.get('/', attendanceController.getAttendances);            // Get all attendance records
router.get('/:id', attendanceController.getAttendanceById);     // Get a specific attendance record by ID
router.post('/', attendanceController.createAttendance);         // Create a new attendance record
router.put('/:id', attendanceController.updateAttendance);      // Update an attendance record by ID
router.delete('/:id', attendanceController.deleteAttendance);   // Delete an attendance record by ID

module.exports = router;
