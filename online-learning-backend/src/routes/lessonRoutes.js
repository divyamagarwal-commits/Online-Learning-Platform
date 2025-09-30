const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const auth = require("../middleware/auth");

// Get lesson details
router.get("/:id", auth, lessonController.getLesson);

// Update progress
router.post("/:id/progress", auth, lessonController.updateProgress);

// Save note
router.post("/:id/notes", auth, lessonController.saveNote);

module.exports = router;
