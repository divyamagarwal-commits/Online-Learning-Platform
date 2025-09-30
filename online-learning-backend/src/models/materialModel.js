const db = require("../config/database");

const MaterialModel = {
  // Get all materials for a course
  getCourseMaterials: async (userId, courseId) => {
    // Optional: check enrollment
    const enrolled = await db.query(
      "SELECT * FROM enrollments WHERE user_id=$1 AND course_id=$2",
      [userId, courseId]
    );
    if (enrolled.rows.length === 0) throw new Error("User not enrolled in this course");

    const query = `
      SELECT id, title, type, chapter, size, download_url
      FROM study_materials
      WHERE course_id=$1
    `;
    const result = await db.query(query, [courseId]);
    return result.rows;
  },

  // Track material download
  trackDownload: async (userId, materialId) => {
    const query = `
      INSERT INTO material_downloads (user_id, material_id, downloaded_at)
      VALUES ($1,$2,NOW()) RETURNING *
    `;
    const result = await db.query(query, [userId, materialId]);
    return result.rows[0];
  },
};

module.exports = MaterialModel;
