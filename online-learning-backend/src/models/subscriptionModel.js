const db = require("../config/database");

const SubscriptionModel = {
  getPlans: async () => {
    const query = "SELECT * FROM subscription_plans";
    return db.query(query);
  },

  purchasePlan: async (userId, planId) => {
    const purchaseDate = new Date();
    const planRes = await db.query("SELECT * FROM subscription_plans WHERE id=$1", [planId]);
    if (planRes.rows.length === 0) throw new Error("Plan not found");

    const duration = planRes.rows[0].duration; // e.g., 'monthly'
    let expiryDate = new Date(purchaseDate);
    if (duration === "monthly") expiryDate.setMonth(expiryDate.getMonth() + 1);
    else if (duration === "yearly") expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    await db.query(
      `INSERT INTO user_subscriptions (user_id, plan_id, purchase_date, expiry_date)
       VALUES ($1,$2,$3,$4)`,
      [userId, planId, purchaseDate, expiryDate]
    );

    return {
      userId,
      planId,
      purchaseDate,
      expiryDate,
    };
  },
};

module.exports = SubscriptionModel;
