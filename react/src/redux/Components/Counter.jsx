import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../slice/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <div className="bg-black text-white p-2 flex flex-col items-center">
        <h1 className="text-2xl">Count: {count}</h1>

        <div className="flex  gap-2">
          <button
            className="bg-green-500 px-2 rounded cursor-pointer"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>

          <button
            className="bg-red-500 px-2 rounded cursor-pointer"
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
