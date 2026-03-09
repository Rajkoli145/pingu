const Event = require("../models/Event");
const catchAsync = require("../utils/catchAsync");

exports.getAllEvents = catchAsync(async (req, res) => {
  const events = await Event.find({ user: req.user.id }).sort({ date: 1 });
  res.json(events);
});

exports.createEvent = catchAsync(async (req, res) => {
  const event = new Event({
    ...req.body,
    user: req.user.id
  });
  const newEvent = await event.save();
  res.status(201).json(newEvent);
});

exports.updateEvent = catchAsync(async (req, res) => {
  const event = await Event.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  if (!event) {
    return res.status(404).json({ message: "Event not found or unauthorized" });
  }
  res.json(event);
});

exports.deleteEvent = catchAsync(async (req, res) => {
  const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!event) {
    return res.status(404).json({ message: "Event not found or unauthorized" });
  }
  res.json({ message: "Event deleted successfully" });
});
