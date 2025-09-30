const MaterialModel = require("../models/materialModel");

// Get course materials
exports.getCourseMaterials = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const materials = await MaterialModel.getCourseMaterials(userId, courseId);
    res.json({ success: true, materials });
  } catch (err) {
    console.error("Get Course Materials Error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Track material download
exports.trackDownload = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const download = await MaterialModel.trackDownload(userId, id);
    res.json({ success: true, download });
  } catch (err) {
    console.error("Track Material Download Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
