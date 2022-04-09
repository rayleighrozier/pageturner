import { SET_PAGE } from "../action-types/index";
const defaultState = "SignIn";

function page(state = defaultState, action) {
  switch (action.type) {
    case SET_PAGE:
      return action.payload;
    default:
      return state;
  }
}

export default page;
