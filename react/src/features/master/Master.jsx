import React from "react";
import Navbar from "../../Components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

const Master = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center gap-10  flex-wrap p-10 shadow-lg">
        <h2
          onClick={() => navigate("/admin/master/countries")}
          className="text-3xl font-bold hover:shadow-2xl  cursor-pointer p-10 rounded-3xl border border-gray-300 transistion-all duration-300"
        >
          Country
        </h2>
        <h2
          onClick={() => navigate("/admin/master/state")}
          className="text-3xl font-bold hover:shadow-2xl cursor-pointer p-10 rounded-3xl border border-gray-300 transition-all duration-300"
        >
          State{" "}
        </h2>
        <h2
          onClick={() => navigate("/admin/master/cities")}
          className="text-3xl font-bold hover:shadow-2xl cursor-pointer p-10 rounded-3xl border border-gray-300 transition-all duration-300"
        >
          Cities
        </h2>
      </div>
      <Outlet />
    </div>
  );
};

export default Master;
