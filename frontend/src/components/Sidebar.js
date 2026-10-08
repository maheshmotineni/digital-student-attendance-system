import { Link } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{width:"220px"}}>

      <h4 className="mb-4">Attendance System</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/">
            Home
          </Link>
        </li>

        {role === "admin" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin">
              Admin Dashboard
            </Link>
          </li>
        )}

        {role === "teacher" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/teacher">
              Teacher Dashboard
            </Link>
          </li>
        )}

        {role === "student" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/student">
              Student Dashboard
            </Link>
          </li>
        )}

        <li className="nav-item mt-4">
          <button
            className="btn btn-danger w-100"
            onClick={()=>{
              localStorage.clear();
              window.location.href="/";
            }}
          >
            Logout
          </button>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;