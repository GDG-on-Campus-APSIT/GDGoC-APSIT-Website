const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize } = format;
const path = require("path");
require("winston-mongodb"); // Load MongoDB transport for Winston

// Define the absolute path for the log file
const logFilePath = path.join(__dirname, "../../logs/app.log");

// Custom format for console logging with colors, improves readability of log levels in the console
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message }) => {
    return `${level}: ${message}`; // Customize console output to show level and message
  })
);

// Create a Winston logger with configurations for multiple transports (Console, File, and MongoDB)
const logger = createLogger({
  level: "info", // Minimum log level to capture
  format: combine(timestamp(), json()), // Default format includes timestamp in JSON format
  transports: [
    // Console transport with colorized output for development readability
    new transports.Console({
      format: consoleLogFormat,
    }),
    // File transport to store logs in a specified file on the file system
    new transports.File({ filename: logFilePath }),
    // MongoDB transport to store logs in a MongoDB collection
    new transports.MongoDB({
      db: process.env.MONGO_URI, // MongoDB connection URI, ensure this is correctly set in environment
      collection: 'logs', // MongoDB collection name for logs
      level: 'info', // Minimum log level for MongoDB storage
      // Custom format for MongoDB entries to log structured data
      format: format((info) => {
        try {
          const logMessage = JSON.parse(info.message); // Parse the structured message from the logger
          // Return structured log object with relevant fields
          return {
            level: info.level,
            method: logMessage.method,
            url: logMessage.url,
            status: logMessage.status,
            responseTime: logMessage.responseTime,
            timestamp: info.timestamp // Include timestamp for chronological sorting
          };
        } catch (err) {
          // Fallback in case of parsing errors, logs empty fields and timestamp
          console.error('Error parsing log message:', err);
          return {
            method: null,
            url: null,
            status: null,
            responseTime: null,
            timestamp: info.timestamp
          };
        }
      })(),
    }),
  ],
});

// Custom function to log structured data as JSON string, supporting consistent logging format
logger.logStructured = function (data) {
  this.info(JSON.stringify(data)); // Log structured data as string for uniform parsing
};

module.exports = logger;
