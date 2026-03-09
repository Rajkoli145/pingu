const Assignment = require("../models/Assignment");
const Notice = require("../models/Notice");
const Event = require("../models/Event");
const Lecture = require("../models/Lecture");
const Attendance = require("../models/Attendance");

class CommandCenterService {
  /**
   * Aggregates key academic insights for the dashboard.
   */
  async getDashboardSummary(userId) {
    const today = new Date();
    const next48Hours = new Date(today.getTime() + 48 * 60 * 60 * 1000);
    const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [assignments, lectures, attendance, events] = await Promise.all([
      Assignment.find({ user: userId, dueDate: { $lte: next48Hours }, status: "pending" }).sort({ dueDate: 1 }),
      Lecture.find({ user: userId }).sort({ time: 1 }), 
      Attendance.find({ user: userId }),
      Event.find({ user: userId, date: { $gte: today, $lte: next7Days } }).sort({ date: 1 })
    ]);

    // Intelligence: Find the next lecture based on current time
    const nextLecture = this._findNextLecture(lectures);

    // Intelligence: Calculate Attendance Health
    const attendanceSummary = this._calculateAttendanceHealth(attendance);

    return {
      nextLecture,
      urgentAssignments: assignments,
      attendanceHealth: attendanceSummary,
      upcomingEvents: events
    };
  }

  _findNextLecture(lectures) {
    if (!lectures || lectures.length === 0) return null;
    return lectures[0]; 
  }

  _calculateAttendanceHealth(records) {
    if (!records || records.length === 0) {
      return { overall: 0, status: "Unknown", warning: "No records found" };
    }

    const total = records.reduce((acc, curr) => acc + curr.attendancePercentage, 0) / records.length;
    let status = "Healthy";
    let warning = null;

    if (total < 75) {
      status = "At Risk";
      warning = "Overall attendance is below the 75% threshold!";
    } else if (total < 80) {
      status = "Warning";
      warning = "Attendance is dropping close to the limit.";
    }

    return {
      overall: Math.round(total),
      status,
      warning
    };
  }
}

module.exports = new CommandCenterService();
