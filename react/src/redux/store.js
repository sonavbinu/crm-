import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import todoReducer from "./slice/todoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
  },
});
