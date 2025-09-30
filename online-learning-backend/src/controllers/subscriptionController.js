const SubscriptionModel = require("../models/subscriptionModel");

// Get all subscription plans
exports.getPlans = async (req, res) => {
  try {
    const result = await SubscriptionModel.getPlans();
    res.json({ success: true, plans: result.rows });
  } catch (err) {
    console.error("Get Plans Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Purchase subscription
exports.purchasePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.body;

    const purchase = await SubscriptionModel.purchasePlan(userId, planId);
    res.json({ success: true, purchase });
  } catch (err) {
    console.error("Purchase Plan Error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};
