import { combineReducers } from "redux";
import inventory from "./inventory";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  inventory,
  errors,
  messages,
  auth
});
