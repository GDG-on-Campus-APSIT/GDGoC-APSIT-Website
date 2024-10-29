// models/eventModel.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, enum: ["Workshop", "Seminar", "Conference"], required: true }, // Enum for category
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
