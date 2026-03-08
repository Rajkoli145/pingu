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
        id: r._id,
        subject: r.subject,
        attendance: r.attendancePercentage
      }))
    });
  } catch (error) {
    console.error("Fetch Attendance Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /attendance
router.post("/", async (req, res) => {
  try {
    const { subject, attendancePercentage } = req.body;
    const newRecord = new Attendance({ subject, attendancePercentage });
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error("Create Attendance Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /attendance/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedRecord = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.json(updatedRecord);
  } catch (error) {
    console.error("Update Attendance Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /attendance/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await Attendance.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    console.error("Delete Attendance Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
