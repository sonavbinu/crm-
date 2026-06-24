import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Redux = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center gap-10 flex-wrap p-10 shadow-lg">
        <h2
          onClick={() => navigate("/admin/redux/counter")}
          className="text-3xl font-bold hover:shadow-2xl cursor-pointer p-10 rounded-3xl border border-gray-300 transition-all duration-300"
        >
          Counter
        </h2>
        <h2
          onClick={() => navigate("/admin/redux/todo")}
          className="text-3xl font-bold hover:shadow-2xl p-10 rounded-3xl border border-gray-300 transition-all duration-300 cursor-pointer"
        >
          Todo
        </h2>
        <h2
          onClick={() => navigate("/admin/redux/user")}
          className="text-3xl font-bold p-10 rounded-3xl border border-gray-300 transition-all duration-300 cursor-pointer hover:shadow-2xl"
        >
          User
        </h2>
        <h2
          onClick={() => navigate("/admin/redux/cart")}
          className="text-3xl font-bold p-10 border border-gray-300 rounded-3xl transition-all duration-300 cursor-pointer hover:shadow-2xl"
        >
          Cart
        </h2>{" "}
        <h2
          onClick={() => navigate("/admin/redux/notification")}
          className="text-3xl font-bold p-10 border border-gray-300 rounded-3xl transition-all duration-300 cursor-pointer hover:shadow-2xl"
        >
          Notification
        </h2>
      </div>
      <Outlet />
    </div>
  );
};

export default Redux;
