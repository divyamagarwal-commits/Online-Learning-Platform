const SearchModel = require("../models/searchModel");

exports.globalSearch = async (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Query parameter 'q' is required" });

    const results = await SearchModel.search(q, type);
    res.json({ success: true, results });
  } catch (err) {
    console.error("Global Search Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
