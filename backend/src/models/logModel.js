// models/logModel.js

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    method: { type: String, required: true },        // HTTP method (GET, POST, etc.)
    url: { type: String, required: true },           // Request URL
    status: { type: Number, required: true },        // HTTP status code
    responseTime: { type: Number, required: true },  // Response time in milliseconds
    timestamp: { type: Date, default: Date.now },    // Timestamp of the log entry
});

module.exports = mongoose.model("Log", logSchema);