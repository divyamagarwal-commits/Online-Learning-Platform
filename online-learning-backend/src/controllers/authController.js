const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database"); // your DB connection

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Register learner
exports.registerLearner = async (req, res) => {
  try {
    const { name, email, password, mobile, targetExam, preferredLanguage } = req.body;

    // Check if user exists
    const existing = await db.query("SELECT id FROM users WHERE email=$1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert learner
    const result = await db.query(
      `INSERT INTO users (name, email, password, mobile, role, target_exam, preferred_language)
       VALUES ($1,$2,$3,$4,'learner',$5,$6) RETURNING id`,
      [name, email, hashedPassword, mobile, targetExam, preferredLanguage]
    );

    const userId = result.rows[0].id;
    const token = jwt.sign({ id: userId, role: "learner" }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      userId,
      token,
    });
  } catch (err) {
    console.error("Register Learner Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Register educator
exports.registerEducator = async (req, res) => {
  try {
    const { name, email, password, mobile, subjects, qualification, experience, bio } = req.body;

    // Check if user exists
    const existing = await db.query("SELECT id FROM users WHERE email=$1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (name, email, password, mobile, role, subjects, qualification, experience, bio, verified)
       VALUES ($1,$2,$3,$4,'educator',$5,$6,$7,$8, FALSE) RETURNING id`,
      [name, email, hashedPassword, mobile, JSON.stringify(subjects), qualification, experience, bio]
    );

    const educatorId = result.rows[0].id;
    const token = jwt.sign({ id: educatorId, role: "educator" }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      message: "Educator registration successful",
      educatorId,
      token,
    });
  } catch (err) {
    console.error("Register Educator Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await db.query("SELECT * FROM users WHERE email=$1 AND role=$2", [email, role]);
    if (user.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      userId: user.rows[0].id,
      role: user.rows[0].role,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
