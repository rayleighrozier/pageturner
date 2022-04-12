import { SET_NEW_ENTRY } from "../action-types/index";
const defaultState = false;
function newEntry(state = defaultState, action) {
  switch (action.type) {
    case SET_NEW_ENTRY:
      return action.payload;
    default:
      return state;
  }
}

export default newEntry;
