import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification, hideNotification } from "../slice/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();

  const { message, type, show } = useSelector((state) => state.notification);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-2">
        <button
          className="text-white bg-green-500 border p-2 rounded hover:bg-green-400 cursor-pointer"
          onClick={() =>
            dispatch(
              showNotification({
                message: "Login Successful!",
                type: "success",
              }),
            )
          }
        >
          Show Success
        </button>
        <button
          className="text-white bg-red-500 border p-2 rounded hover:bg-red-400 cursor-pointer"
          onClick={() =>
            dispatch(
              showNotification({
                message: "Something went wrong!",
                type: "error",
              }),
            )
          }
        >
          Show Error
        </button>

        <button
          className="text-white bg-yellow-500 p-2 rounded hover:bg-yellow-400 cursor-pointer"
          onClick={() => dispatch(hideNotification())}
        >
          Hide
        </button>
      </div>

      {show && (
        <div className="border mt-5 p-2 border-gray-300 rounded-xl flex flex-col items-center ">
          <h3 className="text-2xl font-bold text-blue-500 px-2 py-1 rounded  ">
            {type.toUpperCase()}!
          </h3>
          <p className="font-bold">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
