import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    channelLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { channelLanguage } = languageSlice.actions;
export default languageSlice.reducer;
