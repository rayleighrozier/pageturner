import { combineReducers } from "redux";
import user from "./userReducer";
import page from "./pageReducer";
import currentBook from "./currentBookReducer";
import editShelves from "./editShelvesReducer";
import search from "./searchReducer";
import searchResults from "./searchResultsReducer";
import newEntry from "./newEntryReducer";
import shelved from "./shelvedReducer";

export default combineReducers({
  user,
  page,
  currentBook,
  editShelves,
  search,
  searchResults,
  newEntry,
  shelved,
});
