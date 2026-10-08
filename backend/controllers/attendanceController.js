const Attendance = require("../models/Attendance");
const User = require("../models/User");
const QRSession = require("../models/QRSession");
const axios = require("axios");
const { sendLowAttendanceAlert } = require("../services/emailService");
const riskService = require("../services/riskService");
const { generateAttendancePDF } = require("../utils/pdfGenerator");
const { isWithinCampus } = require("../utils/geoUtils");
const {
  calculateAttendancePercentage,
  getAttendanceStatus
} = require("../utils/attendanceUtils");


// ===============================
// ✅ Manual Attendance (With Geo)
// ===============================
const markAttendance = async (req, res) => {
  try {
    const { studentId, subjectId, status, latitude, longitude } = req.body;

    // 📍 Geo-fencing check
    /*
    if (!isWithinCampus(latitude, longitude)) {
      return res.status(400).json({
        message: "You are outside campus area"
      });
    }
    */

    const attendance = await Attendance.create({
      student: studentId,
      subject: subjectId,
      date: new Date(),
      status
    });

    res.json(attendance);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
// ✅ QR Based Attendance
// ===============================
const markViaQR = async (req, res) => {
  try {
    const { qrToken, studentId } = req.body;

    // 🔍 Find QR session
    const session = await QRSession.findOne({
      token: qrToken,
      isActive: true
    });

    if (!session)
      return res.status(400).json({ message: "Invalid QR" });

    if (new Date() > session.expiresAt)
      return res.status(400).json({ message: "QR Expired" });

    // ❌ Prevent duplicate attendance
    const existingAttendance = await Attendance.findOne({
      student: studentId,
      subject: session.subject,
      date: {
        $gte: new Date().setHours(0,0,0,0),
        $lt: new Date().setHours(23,59,59,999)
      }
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked today"
      });
    }

    // ✅ Create attendance
    const attendance = await Attendance.create({
      student: studentId,
      subject: session.subject,
      date: new Date(),
      status: "Present",
      method: "qr"
    });

    res.json(attendance);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
// ✅ Face Recognition Attendance
// ===============================
const markViaFaceRecognition = async (req, res) => {
  try {
    const { image, subjectId } = req.body;

    const response = await axios.post(
      "http://localhost:5001/verify",
      { image }
    );

    if (!response.data.matched)
      return res.status(400).json({ message: "Face not recognized" });

    const attendance = await Attendance.create({
      student: response.data.studentId,
      subject: subjectId,
      date: new Date(),
      status: "Present",
      method: "face"
    });

    res.json(attendance);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
// ✅ Get Student Attendance
// ===============================
const getStudentAttendance = async (req, res) => {
  try {

    const records = await Attendance.find({
      student: req.params.id
    }).populate("subject");

    res.json(records);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
// ✅ Calculate Attendance Percentage
// ===============================
const calculatePercentageController = async (req, res) => {
  try {

    const studentId = req.params.id;

    const total = await Attendance.countDocuments({
      student: studentId
    });

    const present = await Attendance.countDocuments({
      student: studentId,
      status: "Present"
    });

    const percentage = calculateAttendancePercentage(total, present);
    const status = getAttendanceStatus(percentage);
    const risk = riskService.predictRisk(percentage);

    // 📧 Send low attendance email alert
    if (percentage < 75) {
      await sendLowAttendanceAlert(studentId, percentage);
    }

    res.json({
      total,
      present,
      percentage,
      status,
      risk
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
// ✅ Download Attendance PDF
// ===============================
const downloadPDF = async (req, res) => {
  try {

    const records = await Attendance.find()
      .populate("student")
      .populate("subject");

    generateAttendancePDF(records, res);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===============================
module.exports = {
  markAttendance,
  markViaQR,
  markViaFaceRecognition,
  getStudentAttendance,
  calculatePercentageController,
  downloadPDF
};