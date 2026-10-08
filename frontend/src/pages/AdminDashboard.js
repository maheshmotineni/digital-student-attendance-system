import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    attendance: 0
  });

  useEffect(() => {

    fetch("http://localhost:5001/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log(err));

  }, []);

  return (

    <div className="d-flex">

      {/* Sidebar */}

      <div style={{
        width: "250px",
        height: "100vh",
        background: "#343a40",
        color: "white",
        padding: "20px"
      }}>

        <h4 className="mb-4">Admin Panel</h4>

        <ul className="list-unstyled">

          <li className="mb-3">📊 Dashboard</li>
          <li className="mb-3">👨‍🎓 Students</li>
          <li className="mb-3">👩‍🏫 Teachers</li>
          <li className="mb-3">📅 Attendance</li>
          <li className="mb-3">📈 Analytics</li>

        </ul>

      </div>

      {/* Main Content */}

      <div className="flex-grow-1 p-4 bg-light">

        <h2 className="mb-4">Dashboard Overview</h2>

        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center p-4">
              <h5>Total Students</h5>
              <h2 className="text-success">{stats.students}</h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center p-4">
              <h5>Total Teachers</h5>
              <h2 className="text-primary">{stats.teachers}</h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center p-4">
              <h5>Total Attendance</h5>
              <h2 className="text-warning">{stats.attendance}</h2>
            </div>
          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;