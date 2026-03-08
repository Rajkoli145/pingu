const attendanceService = require("../services/attendanceService");
const catchAsync = require("../utils/catchAsync");

exports.getAttendanceSummary = catchAsync(async (req, res) => {
  const summary = await attendanceService.getAllAttendance();
  res.json(summary);
});

exports.createAttendance = catchAsync(async (req, res) => {
  const newRecord = await attendanceService.createRecord(req.body);
  res.status(201).json(newRecord);
});

exports.updateAttendance = catchAsync(async (req, res) => {
  const updated = await attendanceService.updateRecord(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Attendance record not found" });
  }
  res.json(updated);
});

exports.deleteAttendance = catchAsync(async (req, res) => {
  const deleted = await attendanceService.deleteRecord(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Attendance record not found" });
  }
  res.json({ message: "Attendance record deleted successfully" });
});
