import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  lastSync: null,
  currentIndex: 0,
  queue: [],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setQuotes: {
      reducer: (state, action) => {
        const { items, lastSync } = action.payload;
        state.items = items;
        state.lastSync = lastSync;
      },
      prepare: ({ items }) => {
        const lastSync = Date.now();
        return { payload: { items, lastSync } };
      },
    },
  },
});

export const { setQuotes } = quotesSlice.actions;
export default quotesSlice.reducer;
