const Attendance = require("../models/Attendance");

class AttendanceService {
  async getAllAttendance() {
    const records = await Attendance.find();
    
    if (!records || records.length === 0) {
      return {
        overallAttendance: 0,
        minimumRequired: 75,
        subjects: []
      };
    }

    const totalAttendance = records.reduce((acc, curr) => acc + curr.attendancePercentage, 0);
    const overallAttendance = Math.round(totalAttendance / records.length);

    const subjects = records.map(record => ({
      id: record._id,
      subject: record.subject,
      attendance: record.attendancePercentage
    }));

    return {
      overallAttendance,
      minimumRequired: 75,
      subjects
    };
  }

  async createRecord(data) {
    const attendance = new Attendance(data);
    return await attendance.save();
  }

  async updateRecord(id, data) {
    return await Attendance.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  async deleteRecord(id) {
    return await Attendance.findByIdAndDelete(id);
  }
}

module.exports = new AttendanceService();
