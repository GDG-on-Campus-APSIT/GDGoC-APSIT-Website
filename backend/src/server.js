// src/server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = require("./app");
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}, Swagger Documentation available at http://localhost:${PORT}/api-docs`));
