import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import todoReducer from "./slice/todoSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    user: userReducer,
  },
});
