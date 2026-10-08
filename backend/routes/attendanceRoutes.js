const express = require("express");
const router = express.Router();

const {
  markAttendance,
  markViaQR,
  markViaFaceRecognition,
  getStudentAttendance,
  calculatePercentageController
} = require("../controllers/attendanceController");

const {protect} = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

// Teacher Manual Attendance
router.post(
  "/mark",
  protect,
  roleMiddleware("teacher"),
  markAttendance
);

// QR Attendance (Student)
router.post(
  "/mark-qr",
  protect,
  roleMiddleware("student"),
  markViaQR
);

// Face Recognition Attendance
router.post(
  "/mark-face",
  protect,
  roleMiddleware("teacher"),
  markViaFaceRecognition
);

// Get Student Attendance Records
router.get(
  "/student/:id",
  protect,
  getStudentAttendance
);

// Calculate Attendance Percentage + Risk
router.get(
  "/percentage/:id",
  protect,
  calculatePercentageController
);

module.exports = router;