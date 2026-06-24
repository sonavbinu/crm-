import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slice/userSlice";

const User = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  return (
    <div className="flex flex-col justify-center items-center ">
      <h2 className="text-3xl font-bold mb-5">User authetication</h2>
      {isLoggedIn ? (
        <div className="flex flex-col gap-2">
          <p className="text-2xl">Welcome ,{user.name}</p>
          <button
            className="bg-red-500 text-white rounded px-2 py-2 cursor-pointer hover:bg-red-400"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-red-500 text-white rounded px-2 py-2 cursor-pointer  hover:bg-red-400"
          onClick={() =>
            dispatch(
              login({
                id: 1,
                name: "Sona",
                email: "sona@example.com",
              }),
            )
          }
        >
          Login
        </button>
      )}
    </div>
  );
};

export default User;
