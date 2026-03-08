const express = require("express");
const router = express.Router();

const lectures = [
  {
    id: "1",
    subject: "Artificial Intelligence",
    professor: "Dr. Rao",
    time: "10:00 AM",
    room: "Room 402"
  },
  {
    id: "2",
    subject: "Database Systems",
    professor: "Dr. Sharma",
    time: "11:30 AM",
    room: "Room 305"
  },
  {
    id: "3",
    subject: "Operating Systems",
    professor: "Prof. Mehta",
    time: "2:00 PM",
    room: "Room 210"
  }
];

// GET /lectures
router.get("/", (req, res) => {
  res.json(lectures);
});

module.exports = router;
