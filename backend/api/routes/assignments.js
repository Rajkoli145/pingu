const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// GET /assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    console.error("Fetch Assignments Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
