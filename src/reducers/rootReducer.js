import { combineReducers } from "redux";
import user from "./userReducer";
import page from "./pageReducer";

export default combineReducers({ user, page });
