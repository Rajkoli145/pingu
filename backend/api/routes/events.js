const express = require("express");
const router = express.Router();

const events = [
  {
    id: "1",
    title: "Global Hackathon 2024",
    location: "Tech Innovation Center",
    date: "2026-04-10",
    time: "09:00 AM"
  },
  {
    id: "2",
    title: "Spring Career Fair",
    location: "Grand Ballroom",
    date: "2026-04-15",
    time: "10:00 AM"
  },
  {
    id: "3",
    title: "AI Guest Lecture",
    location: "Auditorium Hall",
    date: "2026-04-20",
    time: "02:00 PM"
  }
];

// GET /events
router.get("/", (req, res) => {
  res.json(events);
});

module.exports = router;
