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

// Define the logging format for Morgan: logs HTTP method, URL, status code, and response time in milliseconds
const morganFormat = ":method :url :status :response-time ms";


// Set up Morgan middleware to log HTTP requests using the defined format.
// Morgan will log each request's method, URL, status, and response time.
// The log message is parsed into an object and then logged by Winston as JSON.
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

// Swagger Setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define Routes
app.use('/api/notifications', require('./routes/notificationRoutes'));

module.exports = app;
