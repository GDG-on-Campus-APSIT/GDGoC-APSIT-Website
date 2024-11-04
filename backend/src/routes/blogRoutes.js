// routes/blogRoutes.js
const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.getBlogs);

router.get('/:id', blogController.getBlogById);

router.post('/', blogController.createBlog);

router.put('/:id', blogController.updateBlog);

router.delete('/:id', blogController.deleteBlog);

module.exports = router;
