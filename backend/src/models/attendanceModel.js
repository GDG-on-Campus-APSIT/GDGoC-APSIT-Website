// models/attendanceModel.js
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  attendance_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Present", "Absent", "Late"], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
