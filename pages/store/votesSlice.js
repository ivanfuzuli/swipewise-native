import { createSlice } from "@reduxjs/toolkit";
import axios from "../../config/@axios";
import axiosOrginal from "axios";

const CancelToken = axiosOrginal.CancelToken;
let cancel;
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
      state.queue = state.queue.filter(
        (el) => !votes.some((item) => item.quote_id === el.quote_id)
      );
    },

    emptyQueue: (state) => {
      state.queue = [];
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

export const sendClap = (vote) => async (dispatch) => {
  const votes = [vote];
  cancel && cancel();
  dispatch({
    type: "votes/pushQueue",
    payload: votes,
  });

  try {
    await axios.post("votes", votes, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    });
    dispatch({
      type: "votes/removeQueue",
      payload: votes,
    });
  } catch (err) {}

  cancel = null;
};

export const dequeue = () => async (dispatch, getState) => {
  const state = getState();
  const votes = state.votes.queue;

  if (votes.length < 1) {
    return false;
  }

  try {
    await axios.post("votes", votes);
    dispatch({
      type: "votes/emptyQueue",
    });
  } catch (err) {}
};

export const { loginViaToken, setHasTags } = votesReducer.actions;
export default votesReducer.reducer;
