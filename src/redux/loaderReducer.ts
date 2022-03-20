import { SET_LOADER } from "./type";
import { TaskActionType} from "../types/types";
const initialData:{isLoading:boolean} = {
  isLoading: false,
};

export const loaderReducer = (state = initialData, action:TaskActionType) => {
  switch (action.type) {
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
