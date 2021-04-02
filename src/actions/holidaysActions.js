import { storeHolidays, updateMonthCoverage } from "./actions";
import api from "../services/api";

export const FetchHolidays = (requestedMonths) => {
  return (dispatch, getState) => {
    const missingMonths = requestedMonths.filter(
      (m) => !getState().coverage.includes(m)
    );
    if (!missingMonths.length) {
      return;
    }
    api.getHolidays(missingMonths).then((response) => {
      let allHolidays = {};
      response.forEach((resp) => {
        Object.assign(allHolidays, resp.data.holidays);
      });
      dispatch(storeHolidays(allHolidays));
      dispatch(updateMonthCoverage(missingMonths));
    });
  };
};
