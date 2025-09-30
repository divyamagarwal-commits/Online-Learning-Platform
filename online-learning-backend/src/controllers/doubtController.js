const DoubtModel = require("../models/doubtModel");

// Post a doubt
exports.postDoubt = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lessonId, question, attachments } = req.body;

    const doubt = await DoubtModel.postDoubt(userId, courseId, lessonId, question, attachments || []);
    res.json({ success: true, doubt });
  } catch (err) {
    console.error("Post Doubt Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get my doubts
exports.getMyDoubts = async (req, res) => {
  try {
    const userId = req.user.id;
    const doubts = await DoubtModel.getMyDoubts(userId);
    res.json({ success: true, doubts });
  } catch (err) {
    console.error("Get My Doubts Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Answer a doubt (educator)
exports.answerDoubt = async (req, res) => {
  try {
    const educatorId = req.user.id;
    if (req.user.role !== "educator") {
      return res.status(403).json({ success: false, message: "Only educators can answer doubts" });
    }

    const { id } = req.params;
    const { answer } = req.body;

    // Optional: check if doubt exists
    const doubt = await DoubtModel.getDoubtById(id);
    if (!doubt) return res.status(404).json({ success: false, message: "Doubt not found" });

    const ans = await DoubtModel.answerDoubt(id, educatorId, answer);
    res.json({ success: true, answer: ans });
  } catch (err) {
    console.error("Answer Doubt Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
