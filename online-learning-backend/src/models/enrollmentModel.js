const db = require("../config/database");

const EnrollmentModel = {
  enrollUser: async (userId, courseId) => {
    const query = `
      INSERT INTO enrollments (user_id, course_id, purchase_date, expiry_date, progress)
      VALUES ($1, $2, NOW(), NOW() + INTERVAL '6 months', 0)
      RETURNING id
    `;
    return db.query(query, [userId, courseId]);
  },
};

module.exports = EnrollmentModel;
