// src/app.js
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const logger = require("./config/logger");
const morgan = require("morgan");


const app = express();
app.use(cors());
app.use(express.json());

// Middleware to disable caching, ensuring all responses return fresh data (avoids 304 Not Modified)
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


// Define the logging format for Morgan: logs HTTP method, URL, status code, and response time in milliseconds
const morganFormat = ":method :url :status :response-time ms";


// Set up Morgan middleware to log HTTP requests using the defined format.
// Morgan will log each request's method, URL, status, and response time.
// The log message is parsed into an object and then logged by Winston as JSON.

let logObject = {};

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: parseInt(message.split(" ")[2]), // Ensure status is a number
          responseTime: parseFloat(message.split(" ")[3]), // Ensure response time is a float
        };

        // Log to console (optional)
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


// Swagger Setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define Routes
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/logs', require('./routes/logRoutes'));

module.exports = app;
