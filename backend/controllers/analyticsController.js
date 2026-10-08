const Attendance = require("../models/Attendance");

const getOverallAnalytics = async (req, res) => {
  try {
    const total = await Attendance.countDocuments();
    const present = await Attendance.countDocuments({ status: "Present" });
    const absent = await Attendance.countDocuments({ status: "Absent" });

    res.json({
      total,
      present,
      absent,
      attendanceRate: total ? (present / total) * 100 : 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMonthlyAnalytics = async (req, res) => {
  try {
    const data = await Attendance.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" } },
          total: { $sum: 1 }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAnalytics = async (req,res) => {
    try{
        const data = await Attendance.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

module.exports = {
    getOverallAnalytics,
    getMonthlyAnalytics,
    getAnalytics
};

