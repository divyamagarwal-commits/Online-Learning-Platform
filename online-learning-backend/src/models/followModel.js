const db = require("../config/database");

const FollowModel = {
  followEducator: async (userId, educatorId) => {
    const query = `
      INSERT INTO educator_followers (user_id, educator_id, followed_at)
      VALUES ($1,$2,NOW())
      ON CONFLICT (user_id, educator_id) DO NOTHING
      RETURNING *
    `;
    return db.query(query, [userId, educatorId]);
  },
};

module.exports = FollowModel;
