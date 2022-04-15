import { SET_SHELVED } from "../action-types/index";
const defaultState = false;

function shelved(state = defaultState, action) {
  switch (action.type) {
    case SET_SHELVED:
      return action.payload;
    default:
      return state;
  }
}

export default shelved;
