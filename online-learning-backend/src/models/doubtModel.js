const db = require("../config/database");

const DoubtModel = {
  // Post a new doubt
  postDoubt: async (userId, courseId, lessonId, question, attachments) => {
    const query = `
      INSERT INTO doubts (user_id, course_id, lesson_id, question, attachments, created_at)
      VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *
    `;
    const result = await db.query(query, [userId, courseId, lessonId, question, attachments]);
    return result.rows[0];
  },

  // Get all doubts of a learner
  getMyDoubts: async (userId) => {
    const query = `
      SELECT * FROM doubts WHERE user_id=$1 ORDER BY created_at DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  },

  // Answer a doubt
  answerDoubt: async (doubtId, educatorId, answer) => {
    const query = `
      INSERT INTO doubt_answers (doubt_id, educator_id, answer, answered_at)
      VALUES ($1,$2,$3,NOW()) RETURNING *
    `;
    const result = await db.query(query, [doubtId, educatorId, answer]);
    return result.rows[0];
  },

  // Optional: Get a single doubt
  getDoubtById: async (doubtId) => {
    const query = `SELECT * FROM doubts WHERE id=$1`;
    const result = await db.query(query, [doubtId]);
    return result.rows[0];
  },
};

module.exports = DoubtModel;
