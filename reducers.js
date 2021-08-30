import { combineReducers } from "redux";
import selected from "./pages/SelectTags/store/selectedSlice";
import auth from "./pages/store/authSlice";
import status from "./pages/store/statusSlice";
import quotes from "./pages/store/quotesSlice";
import votes from "./pages/store/votesSlice";
import stats from "./pages/store/statsSlice";

export default combineReducers({
  selected,
  auth,
  status,
  quotes,
  votes,
  stats,
});
