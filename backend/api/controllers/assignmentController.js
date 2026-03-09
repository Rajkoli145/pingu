const Assignment = require("../models/Assignment");
const catchAsync = require("../utils/catchAsync");

exports.getAllAssignments = catchAsync(async (req, res) => {
  const assignments = await Assignment.find({ user: req.user.id });
  res.json(assignments);
});

exports.createAssignment = catchAsync(async (req, res) => {
  const assignment = new Assignment({
    ...req.body,
    user: req.user.id
  });
  const newAssignment = await assignment.save();
  res.status(201).json(newAssignment);
});

exports.updateAssignment = catchAsync(async (req, res) => {
  const assignment = await Assignment.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found or unauthorized" });
  }
  res.json(assignment);
});

exports.deleteAssignment = catchAsync(async (req, res) => {
  const assignment = await Assignment.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });
  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found or unauthorized" });
  }
  res.json({ message: "Assignment deleted successfully" });
});
