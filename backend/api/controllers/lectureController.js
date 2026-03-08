const Lecture = require("../models/Lecture");
const catchAsync = require("../utils/catchAsync");

exports.getAllLectures = catchAsync(async (req, res) => {
  const lectures = await Lecture.find().sort({ time: 1 });
  res.json(lectures);
});

exports.createLecture = catchAsync(async (req, res) => {
  const lecture = new Lecture(req.body);
  const newLecture = await lecture.save();
  res.status(201).json(newLecture);
});

exports.updateLecture = catchAsync(async (req, res) => {
  const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!lecture) {
    return res.status(404).json({ message: "Lecture not found" });
  }
  res.json(lecture);
});

exports.deleteLecture = catchAsync(async (req, res) => {
  const lecture = await Lecture.findByIdAndDelete(req.params.id);
  if (!lecture) {
    return res.status(404).json({ message: "Lecture not found" });
  }
  res.json({ message: "Lecture deleted successfully" });
});
