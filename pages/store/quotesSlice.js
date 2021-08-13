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
    incIndex: (state) => {
      state.currentIndex = state.currentIndex + 1;
    },
    setQuotes: {
      reducer: (state, action) => {
        const { items, lastSync } = action.payload;
        state.items = items;
        state.lastSync = lastSync;
        state.currentIndex = 0;
      },
      prepare: ({ items }) => {
        const lastSync = Date.now();
        return { payload: { items, lastSync } };
      },
    },
  },
});

export const { incIndex, setQuotes } = quotesSlice.actions;
export default quotesSlice.reducer;
