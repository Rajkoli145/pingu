const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const assignmentsRoutes = require("./routes/assignments");
const noticesRoutes = require("./routes/notices");
const eventsRoutes = require("./routes/events");
const lecturesRoutes = require("./routes/lectures");
const attendanceRoutes = require("./routes/attendance");
const commandCenterRoutes = require("./routes/commandCenter");
const notificationRoutes = require("./routes/notifications");
const scheduler = require("./services/scheduler");

const app = express();

// Connect to Database
connectDB();

// Initialize Background Scheduler
scheduler.init();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Pingu API running" });
});

app.use("/assignments", assignmentsRoutes);
app.use("/notices", noticesRoutes);
app.use("/events", eventsRoutes);
app.use("/lectures", lecturesRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/command-center", commandCenterRoutes);
app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
