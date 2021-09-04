import axiosOrginal from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/@axios";

import combineMerge from "../../config/combineMerge";
import deepmerge from "deepmerge";

const prepareArray = (allIds, newIds) => {
  const next = allIds.filter((el) => !newIds.includes(el));
  return [...next, ...newIds];
};

const LIMIT = 30;

const CancelToken = axiosOrginal.CancelToken;
let cancel;
export const getClaps = createAsyncThunk(
  "claps/getClapsStatus",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const sort = state.claps.sort;
    const filter = sort === "popular" ? state.claps.filter : null;
    const offset =
      sort === "popular"
        ? state.claps.offset.popular[filter]
        : state.claps.offset.newest;

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
          filter,
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
    popular: {
      day: 0,
      week: 0,
      month: 0,
      all: 0,
    },
  },
  total: {
    newest: 0,
    popular: {
      day: 0,
      week: 0,
      month: 0,
      all: 0,
    },
  },
  sort: "popular",
  filter: "day",
  limit: LIMIT,
  error: null,
  byId: {},
  allIds: {
    newest: [],
    popular: {
      day: [],
      week: [],
      month: [],
      all: [],
    },
  },
  loading: true,
};

const clapsReducer = createSlice({
  name: "claps",
  initialState,
  reducers: {
    resetSession: (state, action) => {
      const sort = state.sort;
      const filter = state.filter;

      return {
        ...initialState,
        sort,
        filter,
      };
    },

    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
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
      const { sort, filter } = state;
      const offset =
        sort === "popular" ? state.offset[sort][filter] : state.offset.newest;

      let nextOffset = offset + LIMIT;
      if (nextOffset > total) {
        nextOffset = total;
      }

      state.error = null;
      state.loading = false;

      const allIds = quotes.map((quote) => quote._id);
      const byId = quotes.reduce((obj, quote) => {
        obj[quote._id] = quote;
        return obj;
      }, {});

      if (sort === "popular") {
        state.offset.popular[filter] = nextOffset;
        state.total.popular[filter] = total;
      } else {
        state.offset.newest = nextOffset;
        state.total.newest = total;
      }

      state.byId = deepmerge(state.byId, byId, {
        arrayMerge: combineMerge,
      });

      if (sort === "popular") {
        state.allIds.popular[filter] = prepareArray(
          state.allIds.popular[filter],
          allIds
        );
      } else {
        state.allIds.newest = prepareArray(state.allIds[state.sort], allIds);
      }
    });

    builder.addCase(getClaps.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setSort, setCount, setFilter, resetSession } =
  clapsReducer.actions;
export default clapsReducer.reducer;
