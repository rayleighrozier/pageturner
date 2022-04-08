const defaultState = {
  books: {
    all: [],
    current: [],
    tbr: [],
  },
};

export default function bookReducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_BOOK":
      return { ...state };
    default:
      return state;
  }
}
