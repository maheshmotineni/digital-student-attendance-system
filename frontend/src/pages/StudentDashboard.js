import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function StudentDashboard() {
  const [attendance, setAttendance] = useState(0);

  useEffect(() => {
    const loggedStudent = JSON.parse(localStorage.getItem("student"));
    if (!loggedStudent) return;

    const fetchAttendance = () => {
      fetch("http://localhost:5001/api/attendance")
        .then((res) => res.json())
        .then((data) => {
          const myAttendance = data.filter(
            (item) => String(item.studentId) === String(loggedStudent.id)
          );
          const total = myAttendance.length;
          const present = myAttendance.filter(
            (item) => item.status === "present"
          ).length;
          const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
          setAttendance(percentage);
        });
    };

    fetchAttendance();
    const interval = setInterval(fetchAttendance, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Welcome to Student Dashboard</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm border-left-success h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary">Attendance Percentage</h5>
              <div className="d-flex align-items-center">
                <h2 className="text-success me-3">{attendance}%</h2>
                <div className="progress w-75">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${attendance}%` }}
                    aria-valuenow={attendance}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm border-left-info h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary">Quick Links</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">View Attendance Details</li>
                <li className="list-group-item">Profile Settings</li>
                <li className="list-group-item">Download Attendance Report</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;