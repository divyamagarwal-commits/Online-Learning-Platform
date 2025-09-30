const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");
const auth = require("../middleware/auth");

// Get course materials
router.get("/course/:courseId", auth, materialController.getCourseMaterials);

// Track material download
router.post("/:id/download", auth, materialController.trackDownload);

module.exports = router;
