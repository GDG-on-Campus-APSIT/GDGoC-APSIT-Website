// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebase_uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true, unique: true }, // Made unique
  branch: { type: String, required: true },
  college_joining_year: { type: Number, required: true },
  moodle_id: { type: String, unique: true },
  id_card_image_url: { type: String, required: true },
  role: { type: String, enum: ["Super Admin", "Admin", "Member", "Guest"], required: true },
  profile_picture: { type: String },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
