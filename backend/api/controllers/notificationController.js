const Notification = require("../models/Notification");
const catchAsync = require("../utils/catchAsync");

exports.getAllNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json(notifications);
});

exports.markAsRead = catchAsync(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { readStatus: true },
    { new: true }
  );
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  res.json(notification);
});

exports.deleteNotification = catchAsync(async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  res.json({ message: "Notification cleared" });
});
