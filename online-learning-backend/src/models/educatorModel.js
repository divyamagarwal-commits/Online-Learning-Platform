const db = require("../config/database");

const EducatorModel = {
  getEducators: async (filters) => {
    let query = "SELECT * FROM educators WHERE 1=1";
    const values = [];
    let idx = 1;

    if (filters.subject) {
      query += ` AND $${idx} = ANY(subjects)`;
      values.push(filters.subject);
      idx++;
    }
    if (filters.exam) {
      query += ` AND exam_specialty = $${idx++}`;
      values.push(filters.exam);
    }
    if (filters.rating) {
      query += ` AND rating >= $${idx++}`;
      values.push(filters.rating);
    }

    return db.query(query, values);
  },

  getEducatorById: async (id) => {
    const query = "SELECT * FROM educators WHERE id = $1";
    return db.query(query, [id]);
  },
};

module.exports = EducatorModel;
