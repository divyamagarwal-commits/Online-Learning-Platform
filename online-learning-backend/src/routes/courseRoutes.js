const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const auth = require("../middleware/auth");

// Browse courses
router.get("/", courseController.getCourses);

// Get course details
router.get("/:id", courseController.getCourseById);

// Enroll in a course (auth required)
router.post("/:id/enroll", auth, courseController.enrollCourse);

module.exports = router;
