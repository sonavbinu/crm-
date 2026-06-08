import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentuser");
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-white text-slate-900 font-semibold"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 shadow-xl flex flex-col justify-between  ">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-white">CRM System</h2>
            <ThemeToggle />
          </div>

          <p className="text-slate-400 text-sm mt-1">
            {user?.role === "admin" ? "Administrator" : "Employee"}
          </p>
        </div>{" "}
        {/* Navigation */}
        <nav className="p-4">
          <ul className="flex flex-col gap-2">
            {user?.role === "admin" && (
              <>
                <li>
                  <NavLink to="/admin/dashboard" className={navClass}>
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/admin/profile" className={navClass}>
                    Admin Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/admin/employees" className={navClass}>
                    Employees
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/leaves" className={navClass}>
                    Leave Requests
                  </NavLink>
                </li>
              </>
            )}

            {user?.role === "employee" && (
              <>
                <li>
                  <NavLink to="/employee/dashboard" className={navClass}>
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/employee/profile" className={navClass}>
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/employee/apply-leave" className={navClass}>
                    Apply Leave
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/employee/my-leaves" className={navClass}>
                    My Leaves
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <div>
        <button
          className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 cursor-pointer text-white "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
