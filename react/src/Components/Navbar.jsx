import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end bg-slate-700 ">
        <h1
          className=" text-white px-4 py-2 rounded-md text-lg cursor-pointer hover:bg-slate-600 hover:shadow-3xl transition"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </h1>
        <h1
          className="text-white px-4 py-2 rounded-md text-lg cursor-pointer hover:bg-slate-600"
          onClick={() => {
            navigate("/master");
          }}
        >
          Master
        </h1>
        <h1
          className=" text-white px-4 py-2 rounded-md text-lg cursor-pointer hover:bg-slate-600"
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
