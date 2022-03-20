import { SET_CURRENT_USER } from "./type";
import { TaskActionType,IUser} from "../types/types";

const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
const initialUser:{currentUser:IUser} = {
  currentUser: user
};

export const currentUserReducer = (state = initialUser, action:TaskActionType) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
