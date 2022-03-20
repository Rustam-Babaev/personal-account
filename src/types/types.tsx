import { SET_CURRENT_USER, SET_LOADER, SET_LOGIN } from "../redux/type";
export interface IUser {
  email: string | null;
  password: string | null;
  id?: number;
}

export interface IContact {
  id?: number;
  userId?: number | null;
  name?: string;
  avatar?: string;
}

export interface IStore {
  user: { currentUser: { id: number } };
  loader: { isLoading: boolean };
  login: { isLoggedIn: boolean };
}

export interface IUserHandleSignIn {
  onSubmit(email: string, password: string): void;
}

//Redux
export interface ISetCurrentUser {
  type: typeof SET_CURRENT_USER;
  payload: IUser;
}
export interface ISetLoader {
  type: typeof SET_LOADER;
  payload: boolean;
}
export interface ILoggedIn {
  type: typeof SET_LOGIN;
  payload: boolean;
}

export type TaskActionType = ISetCurrentUser | ISetLoader | ILoggedIn;
