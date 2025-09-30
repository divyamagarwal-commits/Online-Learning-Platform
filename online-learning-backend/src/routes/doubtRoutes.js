const express = require("express");
const router = express.Router();
const doubtController = require("../controllers/doubtController");
const auth = require("../middleware/auth");

// Post a doubt
router.post("/", auth, doubtController.postDoubt);

// Get my doubts
router.get("/my", auth, doubtController.getMyDoubts);

// Answer a doubt (educator only)
router.post("/:id/answer", auth, doubtController.answerDoubt);

module.exports = router;
