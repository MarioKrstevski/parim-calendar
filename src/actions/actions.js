import * as actions from "./actionTypes";

export function storeHolidays(holidays) {
  return {
    type: actions.STORE_HOLIDAYS,
    payload: {
      holidays,
    },
  };
}

export function updateMonthCoverage(monthsArray) {
  return {
    type: actions.UPDATE_MONTH_COVERAGE,
    payload: {
      months: monthsArray,
    },
  };
}
