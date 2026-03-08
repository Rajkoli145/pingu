const Notice = require("../models/Notice");
const catchAsync = require("../utils/catchAsync");

exports.getAllNotices = catchAsync(async (req, res) => {
  const notices = await Notice.find();
  res.json(notices);
});

exports.createNotice = catchAsync(async (req, res) => {
  const notice = new Notice(req.body);
  const newNotice = await notice.save();
  res.status(201).json(newNotice);
});

exports.updateNotice = catchAsync(async (req, res) => {
  const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!notice) {
    return res.status(404).json({ message: "Notice not found" });
  }
  res.json(notice);
});

exports.deleteNotice = catchAsync(async (req, res) => {
  const notice = await Notice.findByIdAndDelete(req.params.id);
  if (!notice) {
    return res.status(404).json({ message: "Notice not found" });
  }
  res.json({ message: "Notice deleted successfully" });
});
