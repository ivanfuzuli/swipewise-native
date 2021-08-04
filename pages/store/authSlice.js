import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/@axios";

export const signup = createAsyncThunk(
  "auth/signupStatus",
  async ({ email, username, password }, thunkAPI) => {
    const response = await axios.post("register", {
      email,
      username,
      password,
    });
    return response.data;
  }
);
const initialState = {
  loggedIn: false,
  errorMessage: null,
  loading: false,
  user: {},
};

const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user } = action;
      state.loggedIn = true;
      state.user = user;
    },
    logout() {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      // Add user to the state array
      state.errorMessage = null;
      state.loading = true;
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      // Add user to the state array
      state.loggedIn = true;
      state.loading = false;
      state.user = action.payload;
    });

    builder.addCase(signup.rejected, (state, action) => {
      // Add user to the state array
      state.loggedIn = false;
      state.loading = false;
      state.user = {};
      state.errorMessage = action.error.message;
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
