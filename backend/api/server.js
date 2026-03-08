const express = require("express");
const cors = require("cors");
const assignmentsRoutes = require("./routes/assignments");
const noticesRoutes = require("./routes/notices");
const eventsRoutes = require("./routes/events");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Pingu API running" });
});

app.use("/assignments", assignmentsRoutes);
app.use("/notices", noticesRoutes);
app.use("/events", eventsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
