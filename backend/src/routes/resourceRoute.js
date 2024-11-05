// routes/resourceRoutes.js
const express = require('express');
const resourceController = require('../controllers/resourcesController');
const router = express.Router();

router.get('/', resourceController.getResources);        // Get all Resources
router.get('/:id', resourceController.getResourceById);  //Get specific resouce by ID
router.post('/', resourceController.createResource);     //Create new resouce 
router.put('/:id', resourceController.updateResource);   //Update resource by ID
router.delete('/:id', resourceController.deleteResource);   //Delete existing resource by ID

module.exports = router;
