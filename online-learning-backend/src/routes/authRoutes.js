const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerLearner);
router.post("/educator/register", authController.registerEducator);
router.post("/login", authController.login);

module.exports = router;
