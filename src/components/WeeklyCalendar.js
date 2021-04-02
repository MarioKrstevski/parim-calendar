import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FetchHolidays } from "../actions/holidaysActions";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  dayNameFormat,
  monthYearFormat,
  dateFormatting,
  APIDateFormat,
} from "../helpers/momentDateFormats";
import { weekdays } from "../helpers/constants";

const WeeklyCalendar = ({ FetchHolidays, holidays }) => {
  const [startDay, setStartDay] = useState("Monday");
  const [weekdaysWithDate, setWeekdaysWithDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  function handleSetNextWeek() {
    setCurrentDate(moment(currentDate).days(7));
  }
  function handleSetPreviousWeek() {
    setCurrentDate(moment(currentDate).days(-7));
  }

  function handleStartDayChange(e) {
    setStartDay(e.target.value);
  }

  // Update what we draw in the UI in start and after interacting with Calendar
  useEffect(() => {
    // Make a week array that starts with our current day
    const weekDaysShifted = [...weekdays];
    while (weekDaysShifted[0] !== startDay) {
      weekDaysShifted.push(weekDaysShifted.shift());
    }

    const currentDateDay = currentDate.format(dayNameFormat);
    const currentDayPostion = weekDaysShifted.findIndex(
      (day) => day === currentDateDay
    );

    // add a moment() date object to each day in the week and store it in state to render the UI by it and also to fetch new dates if needed
    const weekDaysShiftedWithDates = weekDaysShifted.map((day, idx) => ({
      name: day,
      date: moment(currentDate).add(idx - currentDayPostion, "days"),
    }));
    setWeekdaysWithDate(weekDaysShiftedWithDates);
  }, [currentDate, startDay]);

  // Reacts to changes in state, that gets triggered if we click the nav buttons or dropdown
  // Basically tries to fetch holidays from api for current shown dates in UI
  useEffect(() => {
    if (weekdaysWithDate.length) {
      const neededMonths = [
        ...weekdaysWithDate.map((day) => day.date),
      ].map((momentObj) => momentObj.format(monthYearFormat));
      const removedDuplicates = [...new Set(neededMonths)];
      FetchHolidays(removedDuplicates);
    }
  }, [weekdaysWithDate, FetchHolidays]);

  function renderDaysHeaders() {
    return weekdaysWithDate.map((day, index) => (
      <div className="weekday" key={day.name}>
        <div className="weekday__name">{day.name}</div>
        <div className="weekday__date">{day.date.format(dateFormatting)}</div>
      </div>
    ));
  }

  function renderDaysContent() {
    return weekdaysWithDate.map((day, idx) => {
      const match = holidays[day.date.format(APIDateFormat)];
      return (
        <div className="weekday__holidays" key={day.name}>
          {match &&
            match.map((holiday) => (
              <div
                key={holiday.name + holiday.type}
                className={`event type-${holiday.type}`}
              >
                {holiday.name}
              </div>
            ))}
        </div>
      );
    });
  }

  return (
    <div className="calendar">
      <div className="calendar__navigations">
        <div className="calendar__navigations__previous-week">
          <FiArrowLeft onClick={handleSetPreviousWeek} />
        </div>
        <div className="calendar__navigations__start-day">
          <label htmlFor="startDay">Start Day: </label>
          <select
            value={startDay}
            onChange={handleStartDayChange}
            name="startDay"
          >
            {weekdays.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="calendar__navigations__next-week">
          <FiArrowRight onClick={handleSetNextWeek} />
        </div>
      </div>
      <div className="calendar__content">
        <div className="calendar__header">{renderDaysHeaders()}</div>
        <div className="calendar__body">{renderDaysContent()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    holidays: state.holidays,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchHolidays: (neededDates) => dispatch(FetchHolidays(neededDates)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyCalendar);
