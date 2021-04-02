import "./App.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import WeeklyCalendar from "./components/WeeklyCalendar";
import api from "./services/api";

function App() {
  window.moment = moment;

  const [holidays, setHolidays] = useState({});
  const [timelineCoverage, setTimelineCoverage] = useState([]);
  const [neededDates, setNeededDates] = useState([]);

  const monthYearFormat = "MM.YYYY";

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

  async function fetchHolidays(neededDates) {
    const responses = await api.getHolidays(neededDates);
    let allHolidays = {};
    responses.forEach((resp) => {
      Object.assign(allHolidays, resp.data.holidays);
    });
    const updatedHolidays = { ...holidays, ...allHolidays };
    setHolidays(updatedHolidays);
    console.log(updatedHolidays);
    setTimelineCoverage([...timelineCoverage, ...neededDates]);
    setNeededDates([]);
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
      fetchHolidays(neededDates);
    }
  }, [neededDates]);

  return (
    <div className="App">
      <WeeklyCalendar holidays={holidays} notifyUpdate={notifyUpdate} />
    </div>
  );
}

export default App;
