// models/resourceModel.js
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  resource_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["PDF", "Video", "Article"], required: true }, // Enum based on resource type
  content: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", resourceSchema);
