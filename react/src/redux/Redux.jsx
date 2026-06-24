import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Redux = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h2 onClick={() => navigate("/admin/redux/counter")}>Counter</h2>
        <h2 onClick={() => navigate("/admin/redux/todo")}>Todo</h2>
        <h2 onClick={() => navigate("/admin/redux/user")}>User</h2>
      </div>
      <Outlet />
    </div>
  );
};

export default Redux;
