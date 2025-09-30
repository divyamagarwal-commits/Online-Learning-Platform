const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/auth");

// Submit review for a course
router.post("/courses/:id/review", auth, reviewController.submitReview);

module.exports = router;
