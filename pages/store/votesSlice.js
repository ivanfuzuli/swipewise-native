import { createSlice, createAction } from "@reduxjs/toolkit";
import { setQuotes } from "./quotesSlice";
import axios from "../../config/@axios";

const initialState = {
  queue: [],
};

const votesReducer = createSlice({
  name: "votes",
  initialState,
  reducers: {
    pushQueue: (state, action) => {
      const votes = action.payload;
      state.queue.push(...votes);
    },

    removeQueue: (state, action) => {
      const votes = action.payload;
      state.queue = state.queue.filter((el) => !votes.includes(el));
    },
  },
});

export const sendVotes = (vote) => async (dispatch) => {
  const votes = [vote];
  dispatch({
    type: "votes/pushQueue",
    payload: votes,
  });

  try {
    await axios.post("votes", votes);
    dispatch({
      type: "votes/removeQueue",
      payload: votes,
    });
  } catch (err) {}
};

export const { loginViaToken, setHasTags } = votesReducer.actions;
export default votesReducer.reducer;
