const LiveClassModel = require("../models/liveClassModel");

// Get live class schedule
exports.getSchedule = async (req, res) => {
  try {
    const filters = req.query;
    const result = await LiveClassModel.getSchedule(filters);

    res.json({
      success: true,
      liveClasses: result.rows.map((lc) => ({
        id: lc.id,
        title: lc.title,
        educator: lc.educator,
        scheduledAt: lc.scheduled_at,
        duration: lc.duration,
        courseId: lc.course_id,
        maxStudents: lc.max_students,
        enrolled: lc.enrolled,
        status: lc.status,
        joinUrl: null,
      })),
    });
  } catch (err) {
    console.error("Get Live Class Schedule Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Join live class
exports.joinClass = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const joinInfo = await LiveClassModel.joinClass(id, userId);

    res.json({
      success: true,
      liveClass: {
        joinUrl: joinInfo.joinUrl,
        token: joinInfo.token,
        chatEnabled: true,
        pollsEnabled: true,
      },
    });
  } catch (err) {
    console.error("Join Live Class Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Post question during live class
exports.postQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, timestamp } = req.body;
    const userId = req.user.id;

    const result = await LiveClassModel.postQuestion(userId, id, question, timestamp);
    res.status(201).json({ success: true, message: "Question posted", question: result.rows[0] });
  } catch (err) {
    console.error("Post Question Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
