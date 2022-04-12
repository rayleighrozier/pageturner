import { SET_SEARCH } from "../action-types/index";
const defaultState = "";
function search(state = defaultState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
}

export default search;
