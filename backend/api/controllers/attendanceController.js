const attendanceService = require("../services/attendanceService");
const catchAsync = require("../utils/catchAsync");

exports.getAttendanceSummary = catchAsync(async (req, res) => {
  const summary = await attendanceService.getAllAttendance(req.user.id);
  res.json(summary);
});

exports.createAttendance = catchAsync(async (req, res) => {
  const newRecord = await attendanceService.createRecord(req.user.id, req.body);
  res.status(201).json(newRecord);
});

exports.updateAttendance = catchAsync(async (req, res) => {
  const updated = await attendanceService.updateRecord(req.user.id, req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Attendance record not found or unauthorized" });
  }
  res.json(updated);
});

exports.deleteAttendance = catchAsync(async (req, res) => {
  const deleted = await attendanceService.deleteRecord(req.user.id, req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Attendance record not found or unauthorized" });
  }
  res.json({ message: "Attendance record deleted successfully" });
});
