import { combineReducers } from "redux";
import user from "./userReducer";
import page from "./pageReducer";
import currentBook from "./currentBookReducer";

export default combineReducers({ user, page, currentBook });
