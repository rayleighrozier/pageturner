import {
  TEST_USER,
  SET_SIGNED_IN,
  SIGN_IN_USER,
  SET_BOOKS,
  SET_GOOGLE_DATA,
  ADD_USER_BOOK,
  REMOVE_USER_BOOK,
  ADD_BOOK_LOG,
  UPDATE_PAGE_COUNT,
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
      return bookOnShelf(
        action.payload.book.id,
        state.books[action.payload.shelf]
      )
        ? state
        : {
            ...state,
            books: {
              ...state.books,
              [action.payload.shelf]: [
                ...state.books[action.payload.shelf],
                action.payload.book,
              ],
            },
          };
    }
    case REMOVE_USER_BOOK: {
      let index = state.books[action.payload.shelf].findIndex(
        (book) => book.id === action.payload.book.id
      );
      state.books[action.payload.shelf].splice(index, 1);
      return index !== -1
        ? {
            ...state,
            books: {
              ...state.books,
            },
          }
        : state;
    }
    case ADD_BOOK_LOG: {
      state.books.all[action.payload.index].log.push(action.payload.newLog);
      return {
        ...state,
      };
    }
    case UPDATE_PAGE_COUNT: {
      state.books.all[action.payload.index].pagesRead =
        parseInt(state.books.all[action.payload.index].pagesRead) +
        parseInt(action.payload.number);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

export default user;
