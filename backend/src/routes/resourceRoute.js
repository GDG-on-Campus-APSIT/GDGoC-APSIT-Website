// routes/resourceRoutes.js
const express = require('express');
const resourceController = require('../controllers/resourcesController');
const router = express.Router();

router.get('/', resourceController.getResources);
router.get('/:id', resourceController.getResourceById);
router.post('/', resourceController.createResource);
router.put('/:id', resourceController.updateResource);
router.delete('/:id', resourceController.deleteResource);

module.exports = router;
