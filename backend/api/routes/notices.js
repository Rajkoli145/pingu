const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// GET /notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    console.error("Fetch Notices Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /notices
router.post("/", async (req, res) => {
  try {
    const newNotice = new Notice(req.body);
    const savedNotice = await newNotice.save();
    res.status(201).json(savedNotice);
  } catch (error) {
    console.error("Create Notice Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /notices/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.json(updatedNotice);
  } catch (error) {
    console.error("Update Notice Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /notices/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Delete Notice Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
