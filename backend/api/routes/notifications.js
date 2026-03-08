const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET /notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /notifications/:id/read
router.patch("/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { readStatus: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    console.error("Update Notification Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /notifications/:id
router.delete("/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ message: "Notification cleared" });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
