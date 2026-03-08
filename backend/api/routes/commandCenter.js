const express = require("express");
const router = express.Router();
const commandCenterService = require("../services/commandCenterService");

// GET /command-center
router.get("/", async (req, res) => {
  try {
    const summary = await commandCenterService.getDashboardSummary();
    res.json(summary);
  } catch (error) {
    console.error("Command Center API Error:", error);
    res.status(500).json({ message: "Intelligence layer failure" });
  }
});

module.exports = router;
