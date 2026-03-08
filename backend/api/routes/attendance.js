const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// GET /attendance
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find();
    
    // Maintain structure: { subjects, overallAttendance }
    const total = records.length > 0 
      ? records.reduce((acc, curr) => acc + curr.attendancePercentage, 0) / records.length
      : 0;

    res.json({
      overallAttendance: Math.round(total),
      minimumRequired: 75,
      subjects: records.map(r => ({
        subject: r.subject,
        attendance: r.attendancePercentage
      }))
    });
  } catch (error) {
    console.error("Fetch Attendance Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
