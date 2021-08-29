import axiosOrg from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setQuotes } from "./quotesSlice";
import axios from "../../config/@axios";
import env from "../../config/@env";

const CancelToken = axiosOrg.CancelToken;
let cancel;
export const getQuotes = createAsyncThunk(
  "quotes/getQuotesStatus",
  async (_, thunkAPI) => {
    cancel && cancel();
    const response = await axios.get("quotes", {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
      params: {
        limit: env.limit,
      },
    });

    const quotes = response.data;
    thunkAPI.dispatch(
      setQuotes({
        items: quotes,
      })
    );
    cancel = null;
    return true;
  }
);

const initialState = {
  error: null,
  loading: true,
  shareInstagramOpen: false,
  currentQuote: null,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setShareInstagramOpen: (state, action) => {
      state.shareInstagramOpen = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCurrentQuote: (state, action) => {
      state.currentQuote = action.payload;
    },
  },

  extraReducers: (builder) => {
    /**
     * SignUp
     */
    builder.addCase(getQuotes.pending, (state) => {
      state.error = null;
      state.loading = true;
    });

    builder.addCase(getQuotes.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    });

    builder.addCase(getQuotes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setLoading, setCurrentQuote, setShareInstagramOpen } =
  statusSlice.actions;
export default statusSlice.reducer;
