import axiosOrginal from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/@axios";
import take from "lodash/take";

import combineMerge from "../../config/combineMerge";
import deepmerge from "deepmerge";

const prepareArray = (allIds, newIds) => {
  const next = allIds.filter((el) => !newIds.includes(el));
  return [...next, ...newIds];
};

const LIMIT = 15;

const CancelToken = axiosOrginal.CancelToken;
let cancel;
export const getClaps = createAsyncThunk(
  "claps/getClapsStatus",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const sort = state.claps.sort;

    const offset = state.claps.offset[sort];
    cancel && cancel();
    try {
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
      };
    } catch (e) {
      if (axiosOrginal.isCancel(e)) {
        return Promise.reject();
      }

      return thunkAPI.rejectWithValue(e.message);
    }
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
    resetSession: (state, action) => {
      const sort = state.sort;

      return {
        ...initialState,
        sort,
      };
    },

    limitSize: (state) => {
      state.allIds.newest = take(state.allIds.newest, 100);
      state.total.newest = state.allIds.newest.length;

      const newestOffset = state.allIds.newest.length - state.limit;
      state.offset.newest = newestOffset > 1 ? newestOffset : 0;

      state.allIds.popular = take(state.allIds.popular, 100);
      state.total.popular = state.allIds.popular.length;

      const popularOffset = state.allIds.popular.length;
      state.offset.popular = popularOffset > 1 ? popularOffset : 0;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },

    setCount: (state, action) => {
      const { id, count } = action.payload;
      state.byId[id].count = count;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getClaps.pending, (state) => {
      state.error = null;
      state.loading = true;
    });

    builder.addCase(getClaps.fulfilled, (state, action) => {
      const { quotes, total } = action.payload;
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

      state.offset[state.sort] = nextOffset;
      state.total[state.sort] = total;

      state.byId = deepmerge(state.byId, byId, {
        arrayMerge: combineMerge,
      });

      state.allIds[sort] = prepareArray(state.allIds[state.sort], allIds);
    });

    builder.addCase(getClaps.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setSort, setCount, resetSession, limitSize } =
  clapsReducer.actions;
export default clapsReducer.reducer;
