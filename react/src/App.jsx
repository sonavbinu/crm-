import React from "react";
import Register from "./features/auth/pages/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Master from "./features/master/Master";
import Country from "./features/master/Country/pages/Country";
import State from "./features/master/State/pages/State";
import City from "./features/master/City.jsx/pages/City";
import Employees from "./Components/employee/Employees";

const App = () => {
  return (
    <div>
      {" "}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/master" element={<Master />} />
        <Route path="/countries" element={<Country />} />
        <Route path="/state" element={<State />} />
        <Route path="/countries" element={<Country />} />
        <Route path="/cities" element={<City />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  );
};

export default App;
