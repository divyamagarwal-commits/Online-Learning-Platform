const TestModel = require("../models/testModel");
const TestSessionModel = require("../models/testSessionModel");

// Get available tests
exports.getTests = async (req, res) => {
  try {
    const filters = req.query;
    const result = await TestModel.getTests(filters);

    res.json({ success: true, tests: result.rows });
  } catch (err) {
    console.error("Get Tests Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Start a test
exports.startTest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const testRes = await TestModel.getTestById(id);
    if (testRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    const session = await TestSessionModel.startSession(userId, id);
    const questionsRes = await TestModel.getQuestionsByTestId(id);

    res.json({
      success: true,
      testSession: { ...session, questions: questionsRes.rows },
    });
  } catch (err) {
    console.error("Start Test Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Submit test answers
exports.submitTest = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answers, timeSpent } = req.body;

    const result = await TestSessionModel.submitSession(sessionId, answers, timeSpent);

    res.json({ success: true, result });
  } catch (err) {
    console.error("Submit Test Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
