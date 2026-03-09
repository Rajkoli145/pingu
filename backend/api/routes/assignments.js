const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const { protect, restrictTo } = require("../middleware/auth");

router.use(protect);

router.get("/", assignmentController.getAllAssignments);

// Only teachers can create, update, or delete assignments
router.post("/", restrictTo("teacher"), assignmentController.createAssignment);
router.put("/:id", restrictTo("teacher"), assignmentController.updateAssignment);
router.delete("/:id", restrictTo("teacher"), assignmentController.deleteAssignment);

module.exports = router;
