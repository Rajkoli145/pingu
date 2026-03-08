const express = require("express");
const router = express.Router();
const Lecture = require("../models/Lecture");

// GET /lectures
router.get("/", async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (error) {
    console.error("Fetch Lectures Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
