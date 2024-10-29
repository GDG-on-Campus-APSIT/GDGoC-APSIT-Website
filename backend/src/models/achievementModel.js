// models/achievementModel.js
const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  achievement_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  badge_level: { type: Number, required: true },
  issued_to: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Achievement", achievementSchema);
