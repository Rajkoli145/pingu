const cron = require("node-cron");
const Assignment = require("../models/Assignment");
const Attendance = require("../models/Attendance");
const Notification = require("../models/Notification");

class SchedulerService {
  init() {
    console.log("Initializing Smart Notification Scheduler... ⏰");

    // Run every hour: "0 * * * *"
    // For demo/dev purposes, let's run every 10 minutes: "*/10 * * * *"
    cron.schedule("*/10 * * * *", () => {
      console.log("Running periodic academic health check...");
      this.checkDeadlines();
      this.checkAttendance();
    });
  }

  async checkDeadlines() {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const urgentAssignments = await Assignment.find({
      dueDate: { $lte: tomorrow },
      status: "pending"
    });

    for (const assignment of urgentAssignments) {
      const exists = await Notification.findOne({
        entityId: assignment._id,
        entityType: "assignment"
      });

      if (!exists) {
        await Notification.create({
          title: "Assignment Due Soon!",
          message: `Your assignment "${assignment.title}" for ${assignment.subject} is due soon.`,
          type: "urgent",
          entityType: "assignment",
          entityId: assignment._id
        });
        console.log(`Notification generated for assignment: ${assignment.title}`);
      }
    }
  }

  async checkAttendance() {
    const lowAttendance = await Attendance.find({
      attendancePercentage: { $lt: 75 }
    });

    for (const record of lowAttendance) {
      const exists = await Notification.findOne({
        entityId: record._id,
        entityType: "attendance"
      });

      if (!exists) {
        await Notification.create({
          title: "Attendance Risk!",
          message: `Your attendance in ${record.subject} has dropped to ${record.attendancePercentage}%.`,
          type: "warning",
          entityType: "attendance",
          entityId: record._id
        });
        console.log(`Notification generated for attendance risk: ${record.subject}`);
      }
    }
  }
}

module.exports = new SchedulerService();
