const ProgressModel = require("../models/progressModel");

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const summary = await ProgressModel.getDashboard(userId);
    const weekly = await ProgressModel.getWeeklyProgress(userId);

    res.json({
      success: true,
      dashboard: {
        streakDays: 15, // could be calculated from consecutive login records
        totalWatchTime: summary.totalwatchtime || 0,
        coursesEnrolled: summary.coursesenrolled || 0,
        coursesCompleted: summary.coursescompleted || 0,
        upcomingClasses: 2, // placeholder
        pendingTests: 3,    // placeholder
        weeklyProgress: {
          watchTime: weekly.map((d) => d.watchtime || 0),
          lessonsCompleted: weekly.map((d) => d.lessonscompleted || 0),
        },
      },
    });
  } catch (err) {
    console.error("Get Dashboard Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Course progress
exports.getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const progress = await ProgressModel.getCourseProgress(userId, courseId);
    if (!progress) {
      return res.status(404).json({ success: false, message: "No progress found" });
    }

    const chapters = await ProgressModel.getCourseChapters(userId, courseId);

    res.json({
      success: true,
      progress: {
        courseId: progress.course_id,
        enrolledOn: progress.enrolled_on,
        validity: progress.validity,
        overallProgress: progress.overall_progress,
        chapters,
        testsAttempted: progress.tests_attempted,
        avgTestScore: progress.avg_test_score,
        certificateEligible: progress.certificate_eligible,
      },
    });
  } catch (err) {
    console.error("Get Course Progress Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
