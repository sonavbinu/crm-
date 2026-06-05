import React from "react";
import Navbar from "../../../Components/Navbar";

const Dashboard = () => {
  const userData = localStorage.getItem("currentUser");
  const user = userData ? JSON.parse(userData) : null;
  return (
    <div>
      <br />
      <h1 className="flex items-center justify-center text-4xl font-bold shadow-lg p-6">
        Welcome ,{user?.firstName || "Guest"}!
      </h1>
      {user?.role === "admin" && (
        <div>
          <h2>Admin Dashboard</h2>
        </div>
      )}

      {user?.role === "employee" && <div>Employee Dashboard</div>}
    </div>
  );
};

export default Dashboard;
