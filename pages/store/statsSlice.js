import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalSessions: 0,
  rated: false,
};

const quotesSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    incTotalSessions: (state) => {
      state.totalSessions = state.totalSessions + 1;
    },
    setRated: (state, action) => {
      const { payload } = action;
      state.rated = payload;
    },
    resetSession: (state) => {
      state.totalSessions = 0;
    },
  },
});

export const { incTotalSessions, resetSession, setRated } = quotesSlice.actions;
export default quotesSlice.reducer;
