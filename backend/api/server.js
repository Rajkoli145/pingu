require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const scheduler = require("./config/scheduler");

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

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/assignments", require("./routes/assignments"));
app.use("/notices", require("./routes/notices"));
app.use("/events", require("./routes/events"));
app.use("/lectures", require("./routes/lectures"));
app.use("/attendance", require("./routes/attendance"));
app.use("/command-center", require("./routes/commandCenter"));
app.use("/notifications", require("./routes/notifications"));

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
