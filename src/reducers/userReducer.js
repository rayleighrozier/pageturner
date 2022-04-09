import { TEST_USER, SET_SIGNED_IN, SIGN_IN_USER } from "../action-types/index";
const defaultState = { email: "", id: "", signedIn: false };

function user(state = defaultState, action) {
  switch (action.type) {
    case TEST_USER:
      console.log(state);
      return state;
    case SET_SIGNED_IN:
      return { ...state, signedIn: action.payload };
    case SIGN_IN_USER: {
      console.log("current user", action.payload);
      return { ...state, id: action.payload.id, email: action.payload.email };
    }
    default:
      return state;
  }
}

export default user;
