const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  attendancePercentage: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
