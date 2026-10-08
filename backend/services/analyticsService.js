const Attendance = require("../models/Attendance");

exports.getOverallStats = async () => {
  const total = await Attendance.countDocuments();
  const present = await Attendance.countDocuments({ status: "Present" });
  const absent = await Attendance.countDocuments({ status: "Absent" });

  return {
    total,
    present,
    absent,
    attendanceRate: total ? (present / total) * 100 : 0
  };
};

exports.getMonthlyStats = async () => {
  return await Attendance.aggregate([
    {
      $group: {
        _id: { month: { $month: "$date" } },
        total: { $sum: 1 }
      }
    },
    { $sort: { "_id.month": 1 } }
  ]);
};

exports.getSubjectWiseStats = async () => {
  return await Attendance.aggregate([
    {
      $group: {
        _id: { subject: "$subject", status: "$status" },
        count: { $sum: 1 }
      }
    }
  ]);
};