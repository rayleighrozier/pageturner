import { useSelector, useDispatch } from "react-redux";
import { SET_PAGE } from "../action-types/index";

const ChangePage = (destination) => {
  const dispatch = useDispatch();
  let page = useSelector((state) => state.page);
  dispatch({ type: SET_PAGE, payload: destination });
};

export { ChangePage };
