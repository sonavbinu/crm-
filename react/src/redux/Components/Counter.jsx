import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../slice/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col mt-10">
      <div className="bg-black text-white p-2 flex flex-col items-center h-100 justify-center">
        <h1 className="text-2xl mb-6">Count: {count}</h1>

        <div className="flex  gap-4">
          <button
            className="bg-green-500 px-2 py-2 rounded cursor-pointer hover:bg-green-400"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>

          <button
            className="bg-red-500 px-2 rounded cursor-pointer hover:bg-red-400"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
