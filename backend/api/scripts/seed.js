const mongoose = require("mongoose");
const Assignment = require("../models/Assignment");
const Notice = require("../models/Notice");
const Event = require("../models/Event");
const Lecture = require("../models/Lecture");
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const Notification = require("../models/Notification");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/pingu";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Promise.all([
      Assignment.deleteMany({}),
      Notice.deleteMany({}),
      Event.deleteMany({}),
      Lecture.deleteMany({}),
      Attendance.deleteMany({}),
      User.deleteMany({}),
      Notification.deleteMany({})
    ]);

    console.log("Cleared existing collections.");

    // Create Test User
    const testUser = await User.create({
      name: "Test Student",
      email: "test@isu.ac.in",
      password: "password123",
      studentId: "PINGU001",
      college: "Pingu University",
      role: "student"
    });

    console.log("Created Test User: test@pingu.com / password123");

    const userId = testUser._id;

    // Seed Assignments
    await Assignment.insertMany([
      { user: userId, title: "AI Research Paper", subject: "Artificial Intelligence", dueDate: new Date(Date.now() + 172800000), status: "pending" },
      { user: userId, title: "Database Optimization Lab", subject: "Database Systems", dueDate: new Date(Date.now() + 864000000), status: "submitted" },
      { user: userId, title: "Mobile App Prototypes", subject: "Mobile Development", dueDate: new Date(Date.now() + 1728000000), status: "pending" }
    ]);

    // Seed Notices
    await Notice.insertMany([
      { user: userId, title: "Mid-Term Examination Schedule", description: "The exam schedule is out.", date: new Date() },
      { user: userId, title: "Hackathon Registration Open", description: "Join the 48-hour build session.", date: new Date() }
    ]);

    // Seed Events
    await Event.insertMany([
      { user: userId, title: "Tech Symposium 2026", date: new Date(Date.now() + 432000000), time: "10:00 AM", location: "Main Auditorium" },
      { user: userId, title: "Alumni Meetup", date: new Date(Date.now() + 1296000000), time: "06:00 PM", location: "Campus Garden" }
    ]);

    // Seed Lectures
    await Lecture.insertMany([
       { user: userId, subject: "Artificial Intelligence", professor: "Dr. Sharma", time: "09:00 AM", room: "Hall A" },
       { user: userId, subject: "Mobile Development", professor: "Prof. Gupta", time: "11:30 AM", room: "Lab 3" },
       { user: userId, subject: "Operating Systems", professor: "Prof. Mehta", time: "02:00 PM", room: "Room 210" }
    ]);

    // Seed Attendance
    await Attendance.insertMany([
      { user: userId, subject: "Artificial Intelligence", attendancePercentage: 85 },
      { user: userId, subject: "Database Systems", attendancePercentage: 92 },
      { user: userId, subject: "Mobile Development", attendancePercentage: 78 },
      { user: userId, subject: "Low Attendance Subject", attendancePercentage: 60 }
    ]);

    console.log("Successfully seeded the database with user-specific demo data! 🌱");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedData();
