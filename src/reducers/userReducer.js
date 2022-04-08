import { SET_LOGGED_IN } from "../action-types/index";
const defaultState = { loggedIn: false };

function user(state = defaultState, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { ...state };
    default:
      return state;
  }
}

export default user;
