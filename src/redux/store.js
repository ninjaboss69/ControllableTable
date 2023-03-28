import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { RootReducer } from "./rootReducer";
// const middleWares = [logger];
const middleWares = [];

const composeEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(RootReducer, undefined, composeEnhancer);
