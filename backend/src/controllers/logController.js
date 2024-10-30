// controllers/logController.js
const Log = require("../models/logModel")

// Function to create a log entry
exports.createLog = async (req, res) => {
    try {
        const { method, url, status, responseTime } = req.body; // Extract data from request body
        const newLog = new Log({ method, url, status, responseTime });
        await newLog.save();
        res.status(201).json(newLog); // Return the created log entry
    } catch (error) {
        res.status(500).json({ message: 'Error creating log', error });
    }
};

// Function to fetch all logs
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find(); // Fetch all logs from the database
        res.status(200).json(logs); // Return the list of logs
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error });
    }
};

// Function to delete all log entries
exports.deleteAllLogs = async (req, res) => {
    try {
        await Log.deleteMany(); // Deletes all documents in the log collection
        res.status(200).json({ message: "All logs deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting logs", error });
    }
};