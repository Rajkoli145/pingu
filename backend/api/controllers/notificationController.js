const Notification = require("../models/Notification");
const catchAsync = require("../utils/catchAsync");

exports.getAllNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notifications);
});

exports.markAsRead = catchAsync(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { readStatus: true },
    { new: true }
  );
  if (!notification) {
    return res.status(404).json({ message: "Notification not found or unauthorized" });
  }
  res.json(notification);
});

exports.deleteNotification = catchAsync(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });
  if (!notification) {
    return res.status(404).json({ message: "Notification not found or unauthorized" });
  }
  res.json({ message: "Notification cleared" });
});
