const nodemailer = require("nodemailer");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

exports.sendLowAttendanceAlert = async (studentId, percentage) => {
  try {
    const student = await User.findById(studentId);

    if (!student) return;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: student.email,
      subject: "⚠ Attendance Alert",
      text: `Your attendance has dropped to ${percentage.toFixed(
        2
      )}%. Please improve to avoid detention.`
    });

  } catch (error) {
    console.log("Email Error:", error.message);
  }
};