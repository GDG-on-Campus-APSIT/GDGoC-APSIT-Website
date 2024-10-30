// routes/achievementRoutes.js
const express = require('express');
const {
  getAllAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require('../controllers/achievementController');

const router = express.Router();

router.route('/')
  .get(getAllAchievements)    // GET /achievements - Get all achievements
  .post(createAchievement);    // POST /achievements - Create a new achievement

router.route('/:id')
  .get(getAchievementById)     // GET /achievements/:id - Get a single achievement by ID
  .put(updateAchievement)      // PUT /achievements/:id - Update an achievement by ID
  .delete(deleteAchievement);  // DELETE /achievements/:id - Delete an achievement by ID

module.exports = router;
