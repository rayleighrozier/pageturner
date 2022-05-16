import { SET_CURRENT_BOOK, RESET_CURRENT_BOOK } from "../action-types/index";
const defaultState = {};

function currentBook(state = defaultState, action) {
  switch (action.type) {
    case RESET_CURRENT_BOOK:
      return defaultState;
    case SET_CURRENT_BOOK:
      return action.payload;
    default:
      return state;
  }
}

export default currentBook;
