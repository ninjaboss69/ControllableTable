import { combineReducers } from "redux";
import { userReducer } from "./user/user-reducer";

export const RootReducer = combineReducers({ users: userReducer });
