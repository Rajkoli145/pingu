const express = require("express");
const router = express.Router();

const assignments = [
  {
    id: "1",
    title: "DBMS Assignment 2",
    subject: "Database Systems",
    dueDate: "2026-03-15",
    status: "pending"
  },
  {
    id: "2",
    title: "AI Lab Report",
    subject: "Artificial Intelligence",
    dueDate: "2026-03-18",
    status: "submitted"
  }
];

// GET /assignments
router.get("/", (req, res) => {
  res.json(assignments);
});

module.exports = router;
