import { combineReducers } from "redux";
import user from "./userReducer";
import page from "./pageReducer";
import persist from "./persistReducer";

export default combineReducers({ user, page, persist });
