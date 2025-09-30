const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const auth = require("../middleware/auth");

// Dashboard
router.get("/dashboard", auth, progressController.getDashboard);

// Course-specific progress
router.get("/course/:courseId", auth, progressController.getCourseProgress);

module.exports = router;
