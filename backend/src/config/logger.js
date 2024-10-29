const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize } = format;

const path = require("path");

// Define the absolute path for the log file
const logFilePath = path.join(__dirname, "../../logs/app.log");

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: logFilePath }),
  ],
});

module.exports = logger;