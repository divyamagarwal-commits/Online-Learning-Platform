const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const auth = require("../middleware/auth");

// Get subscription plans
router.get("/plans", subscriptionController.getPlans);

// Purchase subscription
router.post("/purchase", auth, subscriptionController.purchasePlan);

module.exports = router;
