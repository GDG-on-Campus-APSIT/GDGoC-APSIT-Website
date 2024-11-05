// controllers/resourceController.js
const Resource = require('../models/resourceModel');

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    const result = await resource.save();
    res.status(201).json(result);
  } catch (error) {
    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    // Handle other server errors
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all resources
exports.getResources = async (req, res) => {
  try {
    // Retrieve all resources
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single resource by ID
exports.getResourceById = async (req, res) => {
  try {
    // Find resource by ID
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a resource by ID
exports.updateResource = async (req, res) => {
  try {
    // Update resource by ID and return the updated record
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(resource);
  } catch (error) {
    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    // Handle other server errors
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a resource by ID
exports.deleteResource = async (req, res) => {
  try {
    // Find and delete resource by ID
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
