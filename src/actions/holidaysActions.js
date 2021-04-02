import { storeHolidays, updateMonthCoverage } from "./actions";
import api from "../services/api";

export const FetchHolidays = (requestedMonths) => {
  return (dispatch, getState) => {
    // only fetch from api the months we haven't fetch so far, we are using the coverage reducer to keep track of this
    const missingMonths = requestedMonths.filter(
      (m) => !getState().coverage.includes(m)
    );
    if (!missingMonths.length) {
      return;
    }
    // i'm calling the ajax call in another file since thats how i started the project 
    
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
