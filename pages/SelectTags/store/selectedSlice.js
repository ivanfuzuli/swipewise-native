import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedTags: [],
};

const counterSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    resetTags: (state) => {
      state.selectedTags = [];
    },

    addTag: (state, action) => {
      state.selectedTags.push(action.payload);
    },

    removeTag: (state, action) => {
      state.selectedTags = state.selectedTags.filter(
        (tag) => tag !== action.payload
      );
    },
  },
});

export const { addTag, removeTag, resetTags } = counterSlice.actions;

export default counterSlice.reducer;
