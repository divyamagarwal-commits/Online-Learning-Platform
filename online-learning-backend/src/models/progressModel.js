const db = require("../config/database");

const ProgressModel = {
  // Dashboard data
  getDashboard: async (userId) => {
    // Query could combine multiple aggregates (simplified here)
    const query = `
      SELECT
        COALESCE(SUM(watch_time),0) as totalWatchTime,
        COUNT(DISTINCT course_id) as coursesEnrolled,
        SUM(CASE WHEN completed = true THEN 1 ELSE 0 END) as coursesCompleted
      FROM user_course_progress
      WHERE user_id = $1
    `;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },

  // Weekly progress (mock data or aggregate)
  getWeeklyProgress: async (userId) => {
    const query = `
      SELECT
        EXTRACT(DOW FROM updated_at) as day,
        SUM(watch_time) as watchTime,
        COUNT(DISTINCT lesson_id) as lessonsCompleted
      FROM lesson_progress
      WHERE user_id = $1
        AND updated_at >= NOW() - INTERVAL '7 days'
      GROUP BY day
      ORDER BY day
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  },

  // Course-specific progress
  getCourseProgress: async (userId, courseId) => {
    const query = `
      SELECT
        course_id,
        enrolled_on,
        validity,
        overall_progress,
        tests_attempted,
        avg_test_score,
        certificate_eligible
      FROM user_course_progress
      WHERE user_id = $1 AND course_id = $2
    `;
    const result = await db.query(query, [userId, courseId]);
    return result.rows[0];
  },

  getCourseChapters: async (userId, courseId) => {
    const query = `
      SELECT
        c.name,
        COUNT(lp.lesson_id) FILTER (WHERE lp.completed = true) as completedLessons,
        COUNT(l.id) as totalLessons,
        ROUND(
          (COUNT(lp.lesson_id) FILTER (WHERE lp.completed = true)::decimal
          / NULLIF(COUNT(l.id),0)) * 100
        ) as progress
      FROM chapters c
      LEFT JOIN lessons l ON l.chapter_id = c.id
      LEFT JOIN lesson_progress lp
        ON lp.lesson_id = l.id AND lp.user_id = $1
      WHERE c.course_id = $2
      GROUP BY c.id
    `;
    const result = await db.query(query, [userId, courseId]);
    return result.rows;
  },
};

module.exports = ProgressModel;
