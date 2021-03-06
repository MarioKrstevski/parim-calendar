import axios from "axios";
import moment from "moment";
import { APIDateFormat } from "../helpers/momentDateFormats";

const API_KEY = "f5fb197fb552a47dc301c0a0327cffa6";
const API_URL =
  "https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays";

const api = {
  // recieves an array of months, and fetches data from api for that month (the whole month)
  getHolidays: async function (neededDates) {
    return axios.all(
      neededDates.map((monthYear) => {
        const currentMonthYearObject = moment()
          .month(monthYear.substr(0, 2) - 1)
          .year(monthYear.substr(3));
        const startOfMonth = currentMonthYearObject
          .clone()
          .startOf("month")
          .format(APIDateFormat);
        const endOfMonth = currentMonthYearObject
          .clone()
          .endOf("month")
          .format(APIDateFormat);

        return axios.post(API_URL, {
          apiKey: API_KEY,
          startDate: startOfMonth,
          endDate: endOfMonth,
        });
      })
    );
  },
};
export default api
