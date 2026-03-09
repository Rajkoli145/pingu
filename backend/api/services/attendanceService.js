const Attendance = require("../models/Attendance");

class AttendanceService {
  async getAllAttendance(userId) {
    const records = await Attendance.find({ user: userId });
    
    if (!records || records.length === 0) {
      return {
        overallAttendance: 0,
        minimumRequired: 75,
        subjects: []
      };
    }
// ... rest of the method

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

  async createRecord(userId, data) {
    const attendance = new Attendance({
      ...data,
      user: userId
    });
    return await attendance.save();
  }

  async updateRecord(userId, id, data) {
    return await Attendance.findOneAndUpdate({ _id: id, user: userId }, data, {
      new: true,
      runValidators: true
    });
  }

  async deleteRecord(userId, id) {
    return await Attendance.findOneAndDelete({ _id: id, user: userId });
  }
}

module.exports = new AttendanceService();
