const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  professor: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Lecture", LectureSchema);
