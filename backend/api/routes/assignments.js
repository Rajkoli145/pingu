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

// POST /assignments
router.post("/", async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    console.error("Create Assignment Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /assignments/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(updatedAssignment);
  } catch (error) {
    console.error("Update Assignment Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /assignments/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error("Delete Assignment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
