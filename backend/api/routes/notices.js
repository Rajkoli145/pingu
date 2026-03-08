const express = require("express");
const router = express.Router();

const notices = [
  {
    id: "1",
    title: "Midterm Schedule Released",
    description: "Check the portal for updated exam timings.",
    date: "2026-03-20"
  },
  {
    id: "2",
    title: "AI Workshop",
    description: "Join the AI workshop this Friday in Computer Lab 3.",
    date: "2026-03-22"
  },
  {
    id: "3",
    title: "Library Hours Extended",
    description: "Library will remain open until midnight during exams.",
    date: "2026-03-25"
  }
];

// GET /notices
router.get("/", (req, res) => {
  res.json(notices);
});

module.exports = router;
