import {
  TEST_USER,
  SET_SIGNED_IN,
  SIGN_IN_USER,
  SET_BOOKS,
  SET_GOOGLE_DATA,
  ADD_USER_BOOK,
} from "../action-types/index";
import { bookOnShelf } from "../actions/book";

const defaultState = {
  email: "",
  id: "",
  books: { all: [], current: [], favorites: [], tbr: [] },
  googleData: [],
  signedIn: false,
};

function user(state = defaultState, action) {
  switch (action.type) {
    case TEST_USER:
      console.log(state);
      return state;
    case SET_SIGNED_IN:
      if (action.payload === false) {
        return defaultState;
      }
      if (action.payload) {
        return { ...state, signedIn: action.payload };
      }

    case SIGN_IN_USER: {
      return { ...state, id: action.payload.id, email: action.payload.email };
    }
    case SET_BOOKS: {
      return { ...state, books: action.payload };
    }
    case SET_GOOGLE_DATA: {
      return { ...state, googleData: action.payload };
    }
    case ADD_USER_BOOK: {
      return bookOnShelf(action.payload.book.id, state.books.all)
        ? state
        : {
            ...state,
            books: {
              ...state.books,
              all: [...state.books.all, action.payload.book],
            },
          };
    }

    default:
      return state;
  }
}

export default user;
