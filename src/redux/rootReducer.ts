import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUserReducer";
import { loaderReducer } from "./loaderReducer";
import { loginReducer } from "./loginReducer";

export const rootReducer = combineReducers({
  user: currentUserReducer,
  loader: loaderReducer,
  login: loginReducer,
});
