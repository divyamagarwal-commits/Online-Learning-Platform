const db = require("../config/database");

const LessonModel = {
  getLessonById: async (lessonId) => {
    const query = `
      SELECT l.*, c.id as course_id, c.title as course_title
      FROM lessons l
      JOIN courses c ON l.course_id = c.id
      WHERE l.id = $1
    `;
    return db.query(query, [lessonId]);
  },

  getNextLesson: async (courseId, currentOrder) => {
    const query = `
      SELECT id, title
      FROM lessons
      WHERE course_id = $1 AND lesson_order > $2
      ORDER BY lesson_order ASC
      LIMIT 1
    `;
    return db.query(query, [courseId, currentOrder]);
  },
};

module.exports = LessonModel;
