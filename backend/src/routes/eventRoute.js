const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Create a new event
router.post("/", eventController.createEvent);

// Get a single event by ID
router.get("/:id", eventController.getEventById);

// Get all events
router.get("/", eventController.getAllEvents);

// Update an event
router.put("/:id", eventController.updateEvent);

// Delete an event
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
