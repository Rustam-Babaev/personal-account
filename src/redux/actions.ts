import { SET_CURRENT_USER, SET_LOADER, SET_LOGIN } from "../redux/type";
import { TaskActionType,IUser } from "../types/types";

export function setCurrentUser(user:IUser):TaskActionType {
  return { type: SET_CURRENT_USER, payload: user };
}

export function setLoader(isLoading:boolean):TaskActionType {
  return { type: SET_LOADER, payload: isLoading };
}

export function loggedIn(isLoggedIn:boolean):TaskActionType {
  return { type: SET_LOGIN, payload: isLoggedIn };
}
