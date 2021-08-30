import axiosOrginal from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/@axios";

import combineMerge from "../../config/combineMerge";
import deepmerge from "deepmerge";

const prepareArray = (allIds, newIds, append) => {
  const next = allIds.filter((el) => !newIds.includes(el));
  if (append) {
    return [...next, ...newIds];
  }
  return [...newIds, ...next];
};

const LIMIT = 15;

const CancelToken = axiosOrginal.CancelToken;
let cancel;
export const getClaps = createAsyncThunk(
  "claps/getClapsStatus",
  async ({ append }, thunkAPI) => {
    const state = thunkAPI.getState();
    const sort = state.claps.sort;

    const offset = state.claps.offset[sort];

    cancel && cancel();
    const response = await axios.get(`claps`, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
      params: {
        offset,
        limit: LIMIT,
        sort,
      },
    });

    const quotes = response.data;
    const total = response.headers["x-total-count"];
    cancel = null;
    return {
      quotes,
      total,
      append,
    };
  }
);

const initialState = {
  offset: {
    newest: 0,
    popular: 0,
  },
  total: {
    newest: 0,
    popular: 0,
  },

  sort: "popular",
  limit: LIMIT,
  error: null,
  byId: {},
  allIds: {
    newest: [],
    popular: [],
  },
  loading: false,
};

const clapsReducer = createSlice({
  name: "claps",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getClaps.pending, (state) => {
      state.error = null;
      state.loading = true;
    });

    builder.addCase(getClaps.fulfilled, (state, action) => {
      const { quotes, total, append } = action.payload;
      const offset = state.offset[state.sort];

      let nextOffset = offset + LIMIT;
      if (nextOffset > total) {
        nextOffset = total;
      }

      const { sort } = state;
      state.error = null;
      state.loading = false;

      const allIds = quotes.map((quote) => quote._id);
      const byId = quotes.reduce((obj, quote) => {
        obj[quote._id] = quote;
        return obj;
      }, {});

      state.offset = nextOffset;
      state.total = total;

      if (!append) {
        state.offset = LIMIT;
      }

      state.byId = deepmerge(state.byId, byId, {
        arrayMerge: combineMerge,
      });

      state.allIds[sort] = prepareArray(
        state.allIds[state.sort],
        allIds,
        append
      );
    });

    builder.addCase(getClaps.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setSort, setOffset } = clapsReducer.actions;
export default clapsReducer.reducer;
