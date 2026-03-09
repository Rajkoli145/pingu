const cron = require("node-cron");
const Assignment = require("../models/Assignment");
const Attendance = require("../models/Attendance");
const Notification = require("../models/Notification");
const User = require("../models/User");

class SchedulerService {
  init() {
    console.log("Initializing Smart Notification Scheduler... ⏰");
    
    // Run every 10 minutes
    cron.schedule("*/10 * * * *", () => {
      this.processAllUsers();
    });
  }

  async processAllUsers() {
    try {
      const users = await User.find();
      for (const user of users) {
        await this.checkAssignments(user._id);
        await this.checkAttendance(user._id);
      }
    } catch (error) {
      console.error("Scheduler process error:", error);
    }
  }

  async checkAssignments(userId) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const urgentAssignments = await Assignment.find({
      user: userId,
      dueDate: { $lte: tomorrow, $gte: today },
      status: "pending"
    });

    for (const assignment of urgentAssignments) {
      // Check if notification already exists
      const existing = await Notification.findOne({
        user: userId,
        entityType: "assignment",
        entityId: assignment._id
      });

      if (!existing) {
        await Notification.create({
          user: userId,
          title: "Upcoming Deadline!",
          message: `The assignment "${assignment.title}" is due within 24 hours.`,
          type: "urgent",
          entityType: "assignment",
          entityId: assignment._id
        });
      }
    }
  }

  async checkAttendance(userId) {
    const records = await Attendance.find({
      user: userId,
      attendancePercentage: { $lt: 75 }
    });

    for (const record of records) {
      const existing = await Notification.findOne({
        user: userId,
        entityType: "attendance",
        entityId: record._id
      });

      if (!existing) {
        await Notification.create({
          user: userId,
          title: "Attendance Risk!",
          message: `Your attendance in ${record.subject} has dropped to ${record.attendancePercentage}%.`,
          type: "warning",
          entityType: "attendance",
          entityId: record._id
        });
      }
    }
  }
}

module.exports = new SchedulerService();
