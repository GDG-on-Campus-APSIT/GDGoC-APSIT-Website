// controllers/attendanceController.js
const Attendance = require('../models/attendanceModel');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    const result = await attendance.save();
    res.status(201).json(result);
  } catch (error) {
    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    // Handle other server errors
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all attendance records
exports.getAttendances = async (req, res) => {
  try {
    // Retrieve and populate attendance records with event and user details
    const attendances = await Attendance.find().populate('event_id').populate('user_id');
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    // Find attendance record by ID and populate with event and user details
    const attendance = await Attendance.findById(req.params.id).populate('event_id').populate('user_id');
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an attendance record by ID
exports.updateAttendance = async (req, res) => {
  try {
    // Update attendance record by ID and return the updated record
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.status(200).json(attendance);
  } catch (error) {
    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    // Handle other server errors
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    // Find and delete attendance record by ID
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
