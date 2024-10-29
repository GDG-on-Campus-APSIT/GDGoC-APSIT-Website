// models/blogModel.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blog_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
