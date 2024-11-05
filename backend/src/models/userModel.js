// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebase_uid: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9]{28}$/.test(v); // Regex for Firebase UID format
      },
      message: props => `${props.value} is not a valid Firebase UID!`
    }
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  college_joining_year: { type: Number, required: true },
  moodle_id: { type: String, unique: true },
  id_card_image_url: { type: String, required: true },
  role: { type: String, enum: ["Super Admin", "Admin", "Member", "Guest"], required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }, // Enum for status
  profile_picture: { type: String },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
