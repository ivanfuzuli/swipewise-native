import combineMerge from "@src/config/combineMerge";
import deepmerge from "deepmerge";

export const initialState = {
  total: 0,
  sort: "popular",
  filter: "day",
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

export const SET_SORT = "SET_SORT";
export const SET_FILTER = "SET_FILTER";
export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_FAILED = "FETCH_FAILED";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const RESET = "RESET";
export const SET_COUNT = "SENT_COUNT";
export const LIMIT = 15;

function reducer(state, action) {
  switch (action.type) {
    case SET_COUNT: {
      const { id, count } = action.payload;
      state.byId[id].count = count;
      break;
    }

    case SET_SORT: {
      const sort = action.payload;
      state.sort = sort;
      if (sort === "newest") {
        state.filter = null;
      } else {
        state.filter = "day";
      }
      break;
    }

    case SET_FILTER: {
      state.filter = action.payload;
      break;
    }

    case RESET: {
      state.total = 0;
      state.allIds = [];
      state.byId = {};
      break;
    }

    case FETCH_PENDING: {
      state.loading = true;
      state.error = null;
      break;
    }

    case FETCH_SUCCESS: {
      const { quotes, total } = action.payload;

      state.error = null;
      state.loading = false;

      const allIds = quotes.map((quote) => quote._id);
      const byId = quotes.reduce((obj, quote) => {
        obj[quote._id] = quote;
        return obj;
      }, {});

      state.total = total;

      state.byId = deepmerge(state.byId, byId, {
        arrayMerge: combineMerge,
      });
      state.allIds = [...state.allIds, ...allIds];
      break;
    }

    case FETCH_FAILED: {
      state.loading = false;
      state.error = action.payload.error;
      break;
    }
    default:
      throw new Error(action.type);
  }
}

export default reducer;
