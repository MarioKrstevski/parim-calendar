import * as actions from "../actions/actionTypes";

// keeps track of all holidays we have fetched for the user session

export function holidaysReducer(state = {}, action) {
  switch (action.type) {
    case actions.STORE_HOLIDAYS:
      return {
        ...state,
        ...action.payload.holidays,
      };
    default:
      return state;
  }
}

// keeps track of which months already have data for, this is how I'm optimizing and minimizing sent requests

export function coverageReducer(state = [], action) {
  switch (action.type) {
    case actions.UPDATE_MONTH_COVERAGE:
      return [...new Set([...state, ...action.payload.months])];
    default:
      return state;
  }
}
