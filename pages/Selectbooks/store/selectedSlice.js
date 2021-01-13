import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { debounce } from "lodash";

const SEARCH_ENUMS = {
  SEARCHING: "searching",
  FAILED: "failed",
  COMPLETED: "completed",
};

const initialState = {
  books: [],
  bookSearchState: SEARCH_ENUMS.COMPLETED,
  searchErrorCode: null,
  selectedItems: [],
  searchValue: "",
};

const counterSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    booksReceived(state, action) {
      state.searchState = SEARCH_ENUMS.COMPLETED;
      state.books = action.payload;
    },

    setSearchState: (state, action) => {
      state.bookSearchState = action.payload;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setSearchState,
  booksReceived,
  setSearchValue,
} = counterSlice.actions;

// Define a thunk that dispatches those action creators

export const searchBooks = (value) => async (dispatch) => {
  dispatch(setSearchState(SEARCH_ENUMS.SEARCHING));
  dispatch(setSearchValue(value));

  search(value, dispatch);
};

const search = debounce(async (value, dispatch) => {
  try {
    const response = await axios.get(
      `https://www.goodreads.com/book/auto_complete?format=json&q=${value}`
    );
    dispatch(booksReceived(response.data));
  } catch (err) {
    console.log(err);
    dispatch(setSearchState(SEARCH_ENUMS.FAILED));
  }
}, 600);

export default counterSlice.reducer;
