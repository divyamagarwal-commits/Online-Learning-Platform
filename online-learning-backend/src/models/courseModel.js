const db = require("../config/database");

const CourseModel = {
  // Browse courses with filters
  browseCourses: async (filters) => {
    let query = `
      SELECT c.*, e.id as educator_id, e.name as educator_name, e.rating as educator_rating
      FROM courses c
      JOIN educators e ON c.educator_id = e.id
      WHERE 1=1
    `;
    const values = [];
    let idx = 1;

    if (filters.exam) {
      query += ` AND c.target_exam = $${idx++}`;
      values.push(filters.exam);
    }
    if (filters.subject) {
      query += ` AND c.subject = $${idx++}`;
      values.push(filters.subject);
    }
    if (filters.language) {
      query += ` AND c.language = $${idx++}`;
      values.push(filters.language);
    }
    if (filters.type) {
      query += ` AND c.type = $${idx++}`;
      values.push(filters.type);
    }
    if (filters.educator) {
      query += ` AND c.educator_id = $${idx++}`;
      values.push(filters.educator);
    }

    if (filters.sort === "price") {
      query += ` ORDER BY c.price ASC`;
    } else if (filters.sort === "rating") {
      query += ` ORDER BY c.rating DESC`;
    } else {
      query += ` ORDER BY c.popularity DESC`;
    }

    return db.query(query, values);
  },

  getCourseById: async (id) => {
    const query = `
      SELECT c.*, e.id as educator_id, e.name as educator_name, e.qualification, e.experience, e.rating as educator_rating
      FROM courses c
      JOIN educators e ON c.educator_id = e.id
      WHERE c.id = $1
    `;
    return db.query(query, [id]);
  },
};

module.exports = CourseModel;
