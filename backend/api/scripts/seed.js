const mongoose = require("mongoose");
const Assignment = require("../models/Assignment");
const Notice = require("../models/Notice");
const Event = require("../models/Event");
const Lecture = require("../models/Lecture");
const Attendance = require("../models/Attendance");

const MONGO_URI = "mongodb://localhost:27017/pingu";

const sampleAssignments = [
  {
    title: "AI Research Paper",
    subject: "Artificial Intelligence",
    dueDate: new Date("2026-03-25"),
    status: "pending"
  },
  {
    title: "Database Optimization Lab",
    subject: "Database Systems",
    dueDate: new Date("2026-03-20"),
    status: "submitted"
  },
  {
    title: "Mobile App Prototypes",
    subject: "Mobile Development",
    dueDate: new Date("2026-03-30"),
    status: "pending"
  }
];

const sampleNotices = [
  {
    title: "Midterm Examination Schedule",
    description: "The midterm exams will commence from March 15th. Check the portal for your seating arrangement.",
    date: new Date("2026-03-08")
  },
  {
    title: "Annual Cultural Fest Recruitment",
    description: "Auditions for the dance and music teams start this Friday at the main auditorium.",
    date: new Date("2026-03-10")
  },
  {
    title: "Library Maintenance Notice",
    description: "The library will be closed for maintenance on Sunday from 9:00 AM to 5:00 PM.",
    date: new Date("2026-03-12")
  }
];

const sampleEvents = [
  {
    title: "Global Tech Summit 2026",
    location: "Main Convention Center",
    date: new Date("2026-04-05"),
    time: "09:00 AM"
  },
  {
    title: "Inter-College Hackathon",
    location: "Innovation Lab",
    date: new Date("2026-04-12"),
    time: "10:00 AM"
  },
  {
    title: "Career Fair: Tech Edition",
    location: "Grand Hall",
    date: new Date("2026-04-20"),
    time: "11:00 AM"
  }
];

const sampleLectures = [
  {
    subject: "Artificial Intelligence",
    professor: "Dr. Rao",
    time: "10:00 AM",
    room: "Room 402"
  },
  {
    subject: "Database Systems",
    professor: "Dr. Sharma",
    time: "11:30 AM",
    room: "Room 305"
  },
  {
    subject: "Operating Systems",
    professor: "Prof. Mehta",
    time: "02:00 PM",
    room: "Room 210"
  }
];

const sampleAttendance = [
  { subject: "Artificial Intelligence", attendancePercentage: 88 },
  { subject: "Database Systems", attendancePercentage: 92 },
  { subject: "Operating Systems", attendancePercentage: 75 },
  { subject: "Mobile Development", attendancePercentage: 80 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Assignment.deleteMany({});
    await Notice.deleteMany({});
    await Event.deleteMany({});
    await Lecture.deleteMany({});
    await Attendance.deleteMany({});
    console.log("Cleared existing collections.");

    // Insert sample data
    await Assignment.insertMany(sampleAssignments);
    await Notice.insertMany(sampleNotices);
    await Event.insertMany(sampleEvents);
    await Lecture.insertMany(sampleLectures);
    await Attendance.insertMany(sampleAttendance);

    console.log("Successfully seeded the database with demo data! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();
