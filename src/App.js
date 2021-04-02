import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import WeeklyCalendar from "./components/WeeklyCalendar";

const API_KEY = "f5fb197fb552a47dc301c0a0327cffa6";
const API_URL =
  "https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays";

function App() {
  window.moment = moment;

  const [holidays, setHolidays] = useState({});
  const [timelineCoverage, setTimelineCoverage] = useState([]);
  const [neededDates, setNeededDates] = useState([]);

  const monthYearFormat = "MM.YYYY";
  const APIDateFormat = "YYYY-MM-DD";

  async function getHolidays(neededDates) {
    console.log("neededDates", neededDates);
    axios
      .all(
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
      )
      .then(
        axios.spread((...responses) => {
          let allHolidays = {};
          responses.forEach((resp) => {
            Object.assign(allHolidays, resp.data.holidays);
          });
          const updatedHolidays = { ...holidays, ...allHolidays };
          setHolidays(updatedHolidays);
          console.log(updatedHolidays);
          setTimelineCoverage([...timelineCoverage, ...neededDates]);
          setNeededDates([]);
        })
      );
  }

  function notifyUpdate(dates) {
    const monthYearFormatedDates = dates.map((momentObj) =>
      momentObj.format(monthYearFormat)
    );
    const removedDuplicates = [...new Set(monthYearFormatedDates)];
    const newNeededDates = removedDuplicates.filter(
      (e) => !timelineCoverage.includes(e) && !neededDates.includes(e)
    );
    // console.log("newNeededDates", newNeededDates);
    // console.log("timelineCoverage ", timelineCoverage);

    if (newNeededDates.length) {
      setNeededDates(newNeededDates);
    }
  }

  useEffect(() => {
    const currentDate = moment();
    const nextMonth = moment(currentDate).add(30, "days");
    const previousMonth = moment(currentDate).add(-30, "days");
    const neededDates = [
      currentDate.format(monthYearFormat),
      nextMonth.format(monthYearFormat),
      previousMonth.format(monthYearFormat),
    ];
    setNeededDates(neededDates);
  }, []);

  useEffect(() => {
    if (neededDates.length) {
      getHolidays(neededDates);
    }
  }, [neededDates]);

  return (
    <div className="App">
      Hello
      <WeeklyCalendar
        holidays={holidays}
        notifyUpdate={notifyUpdate}
      ></WeeklyCalendar>
    </div>
  );
}

export default App;
