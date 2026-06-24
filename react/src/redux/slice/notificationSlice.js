import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", type: "", show: false };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.show = true;
    },
    hideNotification: (state, action) => {
      state.message = "";
      state.type = "";
      state.show = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
