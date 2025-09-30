const db = require("../config/database");

const TestSessionModel = {
  startSession: async (userId, testId) => {
    const sessionId = `TEST_SESSION_${Date.now()}_${userId}`;
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000); // 3 hours

    await db.query(
      `INSERT INTO test_sessions (session_id, user_id, test_id, start_time, end_time)
       VALUES ($1,$2,$3,$4,$5)`,
      [sessionId, userId, testId, startTime, endTime]
    );

    return { sessionId, startTime, endTime };
  },

  submitSession: async (sessionId, answers, timeSpent) => {
    // For simplicity, calculate dummy score
    let score = 0, correct = 0, incorrect = 0, unattempted = 0;

    answers.forEach((ans) => {
      if (ans.selectedOption != null) {
        correct++;
        score += 4;
      } else {
        unattempted++;
      }
    });

    incorrect = answers.length - correct - unattempted;

    // Save result
    await db.query(
      `UPDATE test_sessions SET answers=$2, time_spent=$3, score=$4 WHERE session_id=$1`,
      [sessionId, JSON.stringify(answers), timeSpent, score]
    );

    return {
      score,
      maxScore: answers.length * 4,
      correct,
      incorrect,
      unattempted,
      rank: Math.floor(Math.random() * 1000) + 1,
      percentile: 85.5,
      analysis: {},
    };
  },
};

module.exports = TestSessionModel;
