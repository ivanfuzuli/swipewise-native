import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "../../config/@axios";
import * as SecureStore from "expo-secure-store";

export const signup = createAsyncThunk(
  "auth/signupStatus",
  async ({ email, username, password }) => {
    const response = await axios.post("register", {
      email: email.trim(),
      username: username.trim(),
      password,
    });

    const { token, hasTags } = response.data;
    await SecureStore.setItemAsync("token", token);

    const user = jwt_decode(token);
    return { user, hasTags };
  }
);

export const login = createAsyncThunk(
  "auth/loginStatus",
  async ({ email, password }) => {
    const response = await axios.post("login", {
      email: email.trim(),
      password,
    });

    const { token, hasTags } = response.data;
    await SecureStore.setItemAsync("token", token);

    const user = jwt_decode(token);
    return { user, hasTags };
  }
);

const initialState = {
  loggedIn: false,
  errorMessage: null,
  loading: false,
  user: {},
  hasTags: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginViaToken: (state, action) => {
      const { token, hasTags } = action.payload;
      const user = jwt_decode(token);

      state.errorMessage = null;
      state.loading = false;
      state.loggedIn = true;

      state.hasTags = hasTags;
      state.user = user;
    },

    setHasTags: (state, action) => {
      state.hasTags = action.payload;
    },
  },

  extraReducers: (builder) => {
    /**
     * SignUp
     */
    builder.addCase(signup.pending, (state) => {
      state.errorMessage = null;
      state.loading = true;
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      const { user, hasTags } = action.payload;
      // Add user to the state array
      state.loggedIn = true;
      state.loading = false;
      state.user = user;
      state.hasTags = hasTags;
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.loggedIn = false;
      state.loading = false;
      state.user = {};
      state.errorMessage = action.error.message;
    });

    /**
     * Login
     */
    builder.addCase(login.pending, (state) => {
      state.errorMessage = null;
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      const { user, hasTags } = action.payload;
      // Add user to the state array
      state.loggedIn = true;
      state.loading = false;
      state.user = user;
      state.hasTags = hasTags;
    });

    builder.addCase(login.rejected, (state, action) => {
      // Add user to the state array
      state.loggedIn = false;
      state.loading = false;
      state.user = {};
      state.errorMessage = action.error.message;
    });
  },
});

export const { loginViaToken, setHasTags } = authSlice.actions;
export default authSlice.reducer;
