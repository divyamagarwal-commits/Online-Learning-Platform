const db = require("../config/database");

const LiveClassModel = {
  // Fetch live class schedule
  getSchedule: async (filters) => {
    let query = "SELECT lc.*, e.name as educator FROM live_classes lc JOIN educators e ON lc.educator_id = e.id WHERE 1=1";
    const values = [];
    let idx = 1;

    if (filters.courseId) {
      query += ` AND lc.course_id = $${idx++}`;
      values.push(filters.courseId);
    }
    if (filters.date) {
      query += ` AND DATE(lc.scheduled_at) = $${idx++}`;
      values.push(filters.date);
    }
    if (filters.upcoming) {
      query += ` AND lc.scheduled_at >= NOW()`;
    }

    return db.query(query, values);
  },

  // Join live class (generate dummy join URL/token)
  joinClass: async (liveClassId, userId) => {
    const joinUrl = `https://liveclass.example.com/join/${liveClassId}?user=${userId}`;
    const token = `token_${liveClassId}_${userId}_${Date.now()}`;

    // Update enrolled count
    await db.query("UPDATE live_classes SET enrolled = enrolled + 1 WHERE id=$1", [liveClassId]);

    return { joinUrl, token };
  },

  // Ask question
  postQuestion: async (userId, liveClassId, question, timestamp) => {
    const query = `
      INSERT INTO live_class_questions (user_id, live_class_id, question, timestamp, created_at)
      VALUES ($1,$2,$3,$4,NOW())
      RETURNING *
    `;
    return db.query(query, [userId, liveClassId, question, timestamp]);
  },
};

module.exports = LiveClassModel;
