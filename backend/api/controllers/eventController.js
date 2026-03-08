const Event = require("../models/Event");
const catchAsync = require("../utils/catchAsync");

exports.getAllEvents = catchAsync(async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

exports.createEvent = catchAsync(async (req, res) => {
  const event = new Event(req.body);
  const newEvent = await event.save();
  res.status(201).json(newEvent);
});

exports.updateEvent = catchAsync(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});

exports.deleteEvent = catchAsync(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json({ message: "Event deleted successfully" });
});
