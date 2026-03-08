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

// POST /lectures
router.post("/", async (req, res) => {
  try {
    const newLecture = new Lecture(req.body);
    const savedLecture = await newLecture.save();
    res.status(201).json(savedLecture);
  } catch (error) {
    console.error("Create Lecture Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /lectures/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedLecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.json(updatedLecture);
  } catch (error) {
    console.error("Update Lecture Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /lectures/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedLecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!deletedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.json({ message: "Lecture deleted successfully" });
  } catch (error) {
    console.error("Delete Lecture Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
