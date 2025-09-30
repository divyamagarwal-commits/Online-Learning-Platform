const express = require("express");
const router = express.Router();
const liveClassController = require("../controllers/liveClassController");
const auth = require("../middleware/auth");

// Live class schedule
router.get("/schedule", liveClassController.getSchedule);

// Join live class
router.post("/:id/join", auth, liveClassController.joinClass);

// Post question
router.post("/:id/questions", auth, liveClassController.postQuestion);

module.exports = router;
