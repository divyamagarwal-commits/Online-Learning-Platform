const db = require("../config/database");

const ReviewModel = {
  // Submit a course review
  submitReview: async (userId, courseId, rating, review) => {
    // Check if user is enrolled
    const enrolled = await db.query(
      "SELECT * FROM enrollments WHERE user_id=$1 AND course_id=$2",
      [userId, courseId]
    );
    if (enrolled.rows.length === 0) throw new Error("User not enrolled in this course");

    // Insert review
    const query = `
      INSERT INTO course_reviews (user_id, course_id, rating, review, created_at)
      VALUES ($1,$2,$3,$4,NOW()) RETURNING *
    `;
    const result = await db.query(query, [userId, courseId, rating, review]);
    return result.rows[0];
  },

  // Optional: get all reviews for a course
  getCourseReviews: async (courseId) => {
    const query = `
      SELECT r.id, r.rating, r.review, r.created_at, u.name AS reviewer
      FROM course_reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.course_id=$1
      ORDER BY r.created_at DESC
    `;
    const result = await db.query(query, [courseId]);
    return result.rows;
  },
};

module.exports = ReviewModel;
