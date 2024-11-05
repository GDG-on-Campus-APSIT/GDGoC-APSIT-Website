const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Create a new event
router.post("/", eventController.createEvent);  // Create a new event

// Get a single event by ID
router.get("/:id", eventController.getEventById);  //get specific event by id 

// Get all events
router.get("/", eventController.getAllEvents);  // Get all events

// Update an event
router.put("/:id", eventController.updateEvent);   // Update an event

// Delete an event 
router.delete("/:id", eventController.deleteEvent);   // Delete an event

module.exports = router;
