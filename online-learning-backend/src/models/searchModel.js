const db = require("../config/database");

const SearchModel = {
  search: async (query, type) => {
    const results = {};

    if (!type || type === "course") {
      const coursesQuery = `
        SELECT id, title, target_exam, language, price
        FROM courses
        WHERE title ILIKE $1
      `;
      const courses = await db.query(coursesQuery, [`%${query}%`]);
      results.courses = courses.rows;
    }

    if (!type || type === "educator") {
      const educatorsQuery = `
        SELECT id, name, subjects, rating
        FROM educators
        WHERE name ILIKE $1 OR subjects::text ILIKE $1
      `;
      const educators = await db.query(educatorsQuery, [`%${query}%`]);
      results.educators = educators.rows;
    }

    if (!type || type === "lesson") {
      const lessonsQuery = `
        SELECT id, title, course_id, duration
        FROM lessons
        WHERE title ILIKE $1
      `;
      const lessons = await db.query(lessonsQuery, [`%${query}%`]);
      results.lessons = lessons.rows;
    }

    return results;
  },
};

module.exports = SearchModel;
