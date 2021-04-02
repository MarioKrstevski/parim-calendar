import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const WeeklyCalendar = ({ notifyUpdate, holidays }) => {
  // console.log("HD", holidays)
  const [startDay, setStartDay] = useState("Monday");
  const [weekdaysWithDate, setWeekdaysWithDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const APIDateFormat = "YYYY-MM-DD";

  const dateFormatting = "DD.MM.YYYY";
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function handleSetNextWeek() {
    setCurrentDate(moment(currentDate).days(7));
  }
  function handleSetPreviousWeek() {
    setCurrentDate(moment(currentDate).days(-7));
  }

  function handleStartDayChange(e) {
    setStartDay(e.target.value);
  }

  useEffect(() => {
    const weekDaysShifted = [...weekdays];
    while (weekDaysShifted[0] !== startDay) {
      weekDaysShifted.push(weekDaysShifted.shift());
    }
    const currentDateDay = currentDate.format("dddd");
    const currentDayPostion = weekDaysShifted.findIndex(
      (day) => day === currentDateDay
    );
    const weekDaysShiftedWithDates = weekDaysShifted.map((day, idx) => ({
      name: day,
      date: moment(currentDate).add(idx - currentDayPostion, "days"),
    }));
    setWeekdaysWithDate(weekDaysShiftedWithDates);
  }, [currentDate, startDay]);

  useEffect(() => {
    if (weekdaysWithDate.length) {
      notifyUpdate([...weekdaysWithDate.map((day) => day.date)]);
    }
  }, [weekdaysWithDate]);

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

export default WeeklyCalendar;
