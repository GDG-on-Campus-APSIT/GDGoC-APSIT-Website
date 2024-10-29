// models/notificationModel.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notification_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  type: { type: String, enum: ["Info", "Warning", "Alert"], required: true }, // Enum based on type
  message: { type: String, required: true },
  sent_to: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
