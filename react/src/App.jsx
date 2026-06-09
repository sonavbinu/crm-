import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Dashboard from "./features/dashboard/pages/Dashboard";

import Employees from "./Components/Admin/Employees";
import AdminProfile from "./Components/Admin/AdminProfile";
import EmployeeProfile from "./Components/employee/EmployeeProfile";

import Master from "./features/master/Master";
import Country from "./features/master/Country/pages/Country";
import State from "./features/master/State/pages/State";
import City from "./features/master/City.jsx/pages/City";

import DashboardLayout from "./Components/Layout/DashboardLayout";
import ProtectedRoute from "./Components/Components/ProtectedRoute";
import ApplyLeave from "./Components/employee/ApplyLeave";
import LeaveRequests from "./Components/Admin/LeaveRequests";
import MyLeaves from "./Components/employee/MyLeaves";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="employees" element={<Employees />} />
        <Route path="leaves" element={<LeaveRequests />} />
        <Route path="master" element={<Master />}>
          <Route path="countries" element={<Country />} />
          <Route path="state" element={<State />} />
          <Route path="cities" element={<City />} />
        </Route>
      </Route>

      {/* Employee Layout */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<EmployeeProfile />} />
        <Route path="apply-leave" element={<ApplyLeave />} />
        <Route path="my-leaves" element={<MyLeaves />} />
      </Route>

      {/* Other Routes */}

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
