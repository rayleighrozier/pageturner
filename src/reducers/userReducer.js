const defaultState = {};

function user(state = defaultState, action) {
  switch (action.type) {
    case "GET_USER":
      return { ...state };
    default:
      return state;
  }
}

export default user;
