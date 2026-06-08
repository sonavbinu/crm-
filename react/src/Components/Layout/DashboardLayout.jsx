import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 text-black dark:text-white p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
