const Assignment = require("../models/Assignment");
const catchAsync = require("../utils/catchAsync");

exports.getAllAssignments = catchAsync(async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

exports.createAssignment = catchAsync(async (req, res) => {
  const assignment = new Assignment(req.body);
  const newAssignment = await assignment.save();
  res.status(201).json(newAssignment);
});

exports.updateAssignment = catchAsync(async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }
  res.json(assignment);
});

exports.deleteAssignment = catchAsync(async (req, res) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);
  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }
  res.json({ message: "Assignment deleted successfully" });
});
