const EducatorModel = require("../models/educatorModel");
const FollowModel = require("../models/followModel");

// Browse educators
exports.getEducators = async (req, res) => {
  try {
    const filters = req.query;
    const result = await EducatorModel.getEducators(filters);

    res.json({ success: true, educators: result.rows });
  } catch (err) {
    console.error("Get Educators Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get educator profile
exports.getEducatorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EducatorModel.getEducatorById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Educator not found" });
    }

    res.json({ success: true, educator: result.rows[0] });
  } catch (err) {
    console.error("Get Educator By ID Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Follow educator
exports.followEducator = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await FollowModel.followEducator(userId, id);
    if (result.rows.length === 0) {
      return res.json({ success: true, message: "Already following" });
    }

    res.json({ success: true, message: "Now following educator", follow: result.rows[0] });
  } catch (err) {
    console.error("Follow Educator Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
