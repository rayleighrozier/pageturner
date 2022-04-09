import storage from "redux-persist/lib/storage";
import { RESET_STORAGE } from "../action-types/index";

//test this
function persist(state = {}, action) {
  switch (action.type) {
    case RESET_STORAGE:
      storage.removeItem("persist:root");
      return state;
    default:
      return state;
  }
}

export default persist;
