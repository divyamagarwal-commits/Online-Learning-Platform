const CourseModel = require("../models/courseModel");
const EnrollmentModel = require("../models/enrollmentModel");

// Browse courses with filters
exports.getCourses = async (req, res) => {
  try {
    const filters = req.query;
    const result = await CourseModel.browseCourses(filters);

    res.json({
      success: true,
      courses: result.rows.map((c) => ({
        id: c.id,
        title: c.title,
        educator: {
          id: c.educator_id,
          name: c.educator_name,
          rating: c.educator_rating,
          image: c.educator_image || null,
        },
        targetExam: c.target_exam,
        duration: c.duration,
        totalLessons: c.total_lessons,
        language: c.language,
        price: c.price,
        discountedPrice: c.discounted_price,
        rating: c.rating,
        enrolledStudents: c.enrolled_students,
        thumbnail: c.thumbnail,
        highlights: c.highlights || [],
      })),
    });
  } catch (err) {
    console.error("Browse Courses Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get course details
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CourseModel.getCourseById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const c = result.rows[0];
    res.json({
      success: true,
      course: {
        id: c.id,
        title: c.title,
        description: c.description,
        educator: {
          id: c.educator_id,
          name: c.educator_name,
          qualification: c.qualification,
          experience: c.experience,
          rating: c.educator_rating,
        },
        syllabus: c.syllabus || [],
        features: {
          liveClasses: c.live_classes,
          recordedVideos: c.recorded_videos,
          mockTests: c.mock_tests,
          pdfNotes: c.pdf_notes,
          doubtSupport: c.doubt_support,
        },
        validity: c.duration,
        price: c.price,
        reviews: c.reviews || [],
      },
    });
  } catch (err) {
    console.error("Get Course Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Enroll user in a course
exports.enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // comes from auth middleware

    const result = await EnrollmentModel.enrollUser(userId, id);

    res.status(201).json({
      success: true,
      message: "Enrollment successful",
      enrollmentId: result.rows[0].id,
    });
  } catch (err) {
    console.error("Enroll Course Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
