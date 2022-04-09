import {
  TEST_USER,
  SET_SIGNED_IN,
  SIGN_IN_USER,
  SET_BOOKS,
} from "../action-types/index";
const defaultState = { email: "", id: "", books: {}, signedIn: false };

function user(state = defaultState, action) {
  switch (action.type) {
    case TEST_USER:
      console.log(state);
      return state;
    case SET_SIGNED_IN:
      return { ...state, signedIn: action.payload };
    case SIGN_IN_USER: {
      return { ...state, id: action.payload.id, email: action.payload.email };
    }
    case SET_BOOKS: {
      return { ...state, books: action.payload };
    }
    default:
      return state;
  }
}

export default user;
