require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const qrRoutes = require("./routes/qrRoutes");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/qr", qrRoutes);

app.get("/", (req, res) => {
  res.send("Advanced Digital Student Attendance System API is Running!");
});
app.listen(5001, () => console.log("Server running on port 5001"));