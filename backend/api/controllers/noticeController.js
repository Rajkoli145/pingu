const Notice = require("../models/Notice");
const catchAsync = require("../utils/catchAsync");

exports.getAllNotices = catchAsync(async (req, res) => {
  const notices = await Notice.find({ user: req.user.id });
  res.json(notices);
});

exports.createNotice = catchAsync(async (req, res) => {
  const notice = new Notice({
    ...req.body,
    user: req.user.id
  });
  const newNotice = await notice.save();
  res.status(201).json(newNotice);
});

exports.updateNotice = catchAsync(async (req, res) => {
  const notice = await Notice.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!notice) {
    return res.status(404).json({ message: "Notice not found or unauthorized" });
  }
  res.json(notice);
});

exports.deleteNotice = catchAsync(async (req, res) => {
  const notice = await Notice.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!notice) {
    return res.status(404).json({ message: "Notice not found or unauthorized" });
  }
  res.json({ message: "Notice deleted successfully" });
});
