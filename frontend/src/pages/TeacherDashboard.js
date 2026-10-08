import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TeacherDashboard() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("present");

  const markAttendance = () => {
    fetch("http://localhost:5001/api/attendance/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Attendance marked!");
        setStudentId("");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Teacher Dashboard</h2>
      <div className="card shadow-sm p-4">
        <h5 className="mb-3 text-secondary">Mark Attendance</h5>
        <div className="row">
          <div className="col-md-5 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <button className="btn btn-primary w-100" onClick={markAttendance}>
              Mark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;