const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", attendanceController.getAttendanceSummary);
router.post("/", attendanceController.createAttendance);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
