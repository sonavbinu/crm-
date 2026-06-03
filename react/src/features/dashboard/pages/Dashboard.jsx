import React from "react";
import Navbar from "../../../Components/Navbar";

const Dashboard = () => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  return (
    <div>
      <Navbar />
      <br />
      <h1 className="flex items-center justify-center text-4xl font-bold shadow-lg p-6">
        Welcome ,{user?.firstName || "Guest"}!
      </h1>
    </div>
  );
};

export default Dashboard;
