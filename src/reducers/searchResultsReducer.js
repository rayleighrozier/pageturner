import {
  SET_SEARCH_RESULTS,
  RESET_SEARCH_RESULTS,
} from "../action-types/index";
const defaultState = null;
function searchResults(state = defaultState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return action.payload;
    case RESET_SEARCH_RESULTS:
      return defaultState;
    default:
      return state;
  }
}

export default searchResults;
