const ReviewModel = require("../models/reviewModel");

// Submit a course review
exports.submitReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // courseId
    const { rating, review } = req.body;

    const newReview = await ReviewModel.submitReview(userId, id, rating, review);
    res.json({ success: true, review: newReview });
  } catch (err) {
    console.error("Submit Review Error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};
