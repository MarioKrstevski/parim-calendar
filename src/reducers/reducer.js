import * as actions from "../actions/actionTypes";

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

export function coverageReducer(state = [], action) {
  switch (action.type) {
    case actions.UPDATE_MONTH_COVERAGE:
      return [...new Set([...state, ...action.payload.months])];
    default:
      return state;
  }
}
