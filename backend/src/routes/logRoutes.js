// routes/logRoutes.js
const express = require('express');
const { createLog, getAllLogs, deleteAllLogs } = require("../controllers/logController")

const router = express.Router();
router.route("/")
    .post(createLog)
    .get(getAllLogs)
    .delete(deleteAllLogs)

module.exports = router;