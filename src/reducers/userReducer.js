import { TEST_USER, SET_SIGNED_IN } from "../action-types/index";
const defaultState = { signedIn: false };

function user(state = defaultState, action) {
  switch (action.type) {
    case TEST_USER:
      console.log(state);
      return state;
    case SET_SIGNED_IN:
      return { ...state, signedIn: action.payload };
    default:
      return state;
  }
}

export default user;
