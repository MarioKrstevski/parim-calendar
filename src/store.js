import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { holidaysReducer, coverageReducer } from "./reducers/reducer";
const rootReducer = combineReducers({
  holidays: holidaysReducer,
  coverage: coverageReducer,
});


const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);
