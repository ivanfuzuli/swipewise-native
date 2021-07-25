import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { debounce } from "lodash";

const initialState = {
  selectedTags: [],
};

const counterSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
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

export const {
  setSearchState,
  booksReceived,
  setSearchValue,
  addBook,
  removeByIndex,
  addTag,
  removeTag,
} = counterSlice.actions;

// Define a thunk that dispatches those action creators

export const searchBooks = (value) => async (dispatch) => {
  dispatch(setSearchValue(value));

  if (value.length > 2) {
    search(value, dispatch);
  }
};

const search = debounce(async (value, dispatch) => {
  dispatch(setSearchState(SEARCH_ENUMS.SEARCHING));

  try {
    const response = await axios.get(
      `https://www.goodreads.com/book/auto_complete?format=json&q=${value}`,
      {
        cancelToken: new CancelToken(function executor(e) {
          cancel = e;
        }),
      }
    );
    dispatch(booksReceived(response.data));
  } catch (err) {
    if (__axios.isCancel(err)) {
      return;
    }
    dispatch(setSearchState(SEARCH_ENUMS.FAILED));
  }
}, 600);

export default counterSlice.reducer;
