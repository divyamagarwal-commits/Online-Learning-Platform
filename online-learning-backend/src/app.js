const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const liveClassRoutes = require("./routes/liveClassRoutes");
const testRoutes = require("./routes/testRoutes");
const educatorRoutes = require("./routes/educatorRoutes");
const progressRoutes = require("./routes/progressRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const doubtRoutes = require("./routes/doubtRoutes");
const materialRoutes = require("./routes/materialRoutes");
const searchRoutes = require("./routes/searchRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/live-classes", liveClassRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/educators", educatorRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/doubts", doubtRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/search", searchRoutes);
app.use("/api", reviewRoutes);


app.get("/", (req, res) => {
  res.send("Online Learning Platform API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
