import { combineReducers } from "redux";
import { userReducer } from "./user/user-reducer";
import { treeReducer } from "./tree/tree-reducer";

export const RootReducer = combineReducers({
  users: userReducer,
  tree: treeReducer,
});
