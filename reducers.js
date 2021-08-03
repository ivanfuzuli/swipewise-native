import { combineReducers } from "redux";
import selected from "./pages/SelectTags/store/selectedSlice";
import auth from "./pages/store/authSlice";

export default combineReducers({
  selected,
  auth,
});
