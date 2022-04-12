import { EDIT_SHELVES } from "../action-types/index";
const defaultState = false;
function editShelves(state = defaultState, action) {
  switch (action.type) {
    case EDIT_SHELVES:
      return action.payload;
    default:
      return state;
  }
}

export default editShelves;
