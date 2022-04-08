import { TEST_USER, SET_LOGGED_IN } from "../action-types/index";
const defaultState = { loggedIn: false };

function user(state = defaultState, action) {
  switch (action.type) {
    case TEST_USER:
      console.log(state);
      return state;
    case SET_LOGGED_IN:
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
}

export default user;
