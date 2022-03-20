import { SET_LOGIN } from "./type";
import { TaskActionType} from "../types/types";
const initialData:{isLoggedIn:boolean} = {
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? localStorage.getItem("isLoggedIn") === "true" && true
    : false,
};

export const loginReducer = (state = initialData, action:TaskActionType) => {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};
