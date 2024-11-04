// routes/userRoutes.js
const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(getAllUsers)       // GET /users - Get all users
  .post(createUser);       // POST /users - Create a new user

router.route('/:id')
  .get(getUserById)       // GET /users/:id - Get a single user by ID
  .put(updateUser)        // PUT /users/:id - Update a user by ID
  .delete(deleteUser);    // DELETE /users/:id - Delete a user by ID

module.exports = router;