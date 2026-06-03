import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end items-center px-6 py-3  gap-8 border bg-slate-900 ">
        <h1
          className="bg-slate-400 text-white px-4 py-2 rounded-md text-2xl cursor-pointer hover:bg-slate-700 hover:shadow-3xl transition"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </h1>
        <h1
          className="bg-slate-400 text-white px-4 py-2 rounded-md text-2xl cursor-pointer hover:bg-slate-700"
          onClick={() => {
            navigate("/master");
          }}
        >
          Master
        </h1>
        <h1
          className="bg-slate-400 text-white px-4 py-2 rounded-md text-2xl cursor-pointer hover:bg-slate-700"
          onClick={() => {
            navigate("/employees");
          }}
        >
          Employees
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
