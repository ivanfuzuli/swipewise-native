import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setQuotes } from "./quotesSlice";
import axios from "../../config/@axios";
import env from "../../config/@env";

export const getQuotes = createAsyncThunk(
  "quotes/getQuotesStatus",
  async (_, thunkAPI) => {
    const response = await axios.get("quotes", {
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

    return true;
  }
);

const initialState = {
  error: null,
  loading: true,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
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

export const { loginViaToken, setHasTags } = statusSlice.actions;
export default statusSlice.reducer;
