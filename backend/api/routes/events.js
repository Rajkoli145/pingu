const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET /events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Fetch Events Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
