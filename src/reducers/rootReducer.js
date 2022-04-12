import { combineReducers } from "redux";
import user from "./userReducer";
import page from "./pageReducer";
import currentBook from "./currentBookReducer";
import editShelves from "./editShelvesReducer";

export default combineReducers({ user, page, currentBook, editShelves });
