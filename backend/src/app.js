// src/app.js
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(cors());
app.use(express.json());

// Swagger Setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define Routes
app.use('/api/notifications', require('./routes/notificationRoutes'));

module.exports = app;
