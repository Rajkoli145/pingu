const express = require("express");
const router = express.Router();

const attendanceData = {
  overallAttendance: 78,
  minimumRequired: 75,
  subjects: [
    {
      subject: "Database Systems",
      attendance: 92
    },
    {
      subject: "Artificial Intelligence",
      attendance: 78
    },
    {
      subject: "Operating Systems",
      attendance: 64
    }
  ]
};

// GET /attendance
router.get("/", (req, res) => {
  res.json(attendanceData);
});

module.exports = router;
