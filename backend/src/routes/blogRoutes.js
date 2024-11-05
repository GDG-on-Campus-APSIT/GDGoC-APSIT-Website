// routes/blogRoutes.js
const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.getBlogs);  // Get all blogs records

router.get('/:id', blogController.getBlogById); //get specific one blog by ID 
 
router.post('/', blogController.createBlog);  //create new blog

router.put('/:id', blogController.updateBlog);   //update pre-existing blog by ID 

router.delete('/:id', blogController.deleteBlog); //delete a blog by ID

module.exports = router;
