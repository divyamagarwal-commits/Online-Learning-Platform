const LessonModel = require("../models/lessonModel");
const ProgressModel = require("../models/progressModel");

// Get lesson details (requires enrollment check in auth middleware)
exports.getLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const lessonRes = await LessonModel.getLessonById(id);
    if (lessonRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    const lesson = lessonRes.rows[0];
    const nextLessonRes = await LessonModel.getNextLesson(lesson.course_id, lesson.lesson_order);

    res.json({
      success: true,
      lesson: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        videoUrl: lesson.video_url,
        duration: lesson.duration,
        resources: lesson.resources || [],
        nextLesson: nextLessonRes.rows[0] || null,
      },
    });
  } catch (err) {
    console.error("Get Lesson Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update lesson progress
exports.updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { watchedDuration, totalDuration, completed } = req.body;

    const result = await ProgressModel.updateProgress(userId, id, watchedDuration, totalDuration, completed);
    res.json({ success: true, message: "Progress updated", progress: result.rows[0] });
  } catch (err) {
    console.error("Update Progress Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Save lesson notes
exports.saveNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { timestamp, note } = req.body;

    const result = await ProgressModel.saveNote(userId, id, timestamp, note);
    res.status(201).json({ success: true, message: "Note saved", note: result.rows[0] });
  } catch (err) {
    console.error("Save Note Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
