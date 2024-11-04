// controllers/attendanceController.js
const Attendance = require('../models/attendanceModel');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    const result = await attendance.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all attendance records
exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find().populate('event_id').populate('user_id');
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
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
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
