const db = require("../config/database");

const TestModel = {
  getTests: async (filters) => {
    let query = "SELECT * FROM tests WHERE 1=1";
    const values = [];
    let idx = 1;

    if (filters.courseId) {
      query += ` AND course_id = $${idx++}`;
      values.push(filters.courseId);
    }
    if (filters.type) {
      query += ` AND type = $${idx++}`;
      values.push(filters.type);
    }
    if (filters.subject) {
      query += ` AND subject = $${idx++}`;
      values.push(filters.subject);
    }

    return db.query(query, values);
  },

  getTestById: async (id) => {
    const query = "SELECT * FROM tests WHERE id = $1";
    return db.query(query, [id]);
  },

  getQuestionsByTestId: async (testId) => {
    const query = "SELECT * FROM test_questions WHERE test_id=$1";
    return db.query(query, [testId]);
  },
};

module.exports = TestModel;
