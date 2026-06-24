import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import todoReducer from "./slice/todoSlice";
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";
import notificationReducer from "./slice/notificationSlice";
import languageReducer from "./slice/languageSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    user: userReducer,
    cart: cartReducer,
    notification: notificationReducer,
    language: languageReducer,
  },
});
