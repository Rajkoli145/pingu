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

module.exports = router;
