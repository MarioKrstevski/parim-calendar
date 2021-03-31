import moment from "moment";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const WeeklyCalendar = () => {
  const [startDay, setStartDay] = useState("Monday");
  const [currentDate, setCurrentDate] = useState(moment());
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
  function renderDays() {
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
      date: moment(currentDate)
        .add(idx - currentDayPostion, "days")
        .format(dateFormatting),
    }));
    return weekDaysShiftedWithDates.map((day, index) => (
      <div className="weekday">
        <div className="weekday__name">{day.name}</div>
        <div className="weekday__date">{day.date}</div>
      </div>
    ));
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
            onChange={(e) => {
              setStartDay(e.target.value);
            }}
            name="startDay"
          >
            {weekdays.map((day) => (
              <option>{day}</option>
            ))}
          </select>
        </div>
        <div className="calendar__navigations__next-week">
          <FiArrowRight onClick={handleSetNextWeek} />
        </div>
      </div>
      <div className="calendar__header">{renderDays()}</div>
      <div className="calendar__body">{currentDate.format(dateFormatting)}</div>
    </div>
  );
};

export default WeeklyCalendar;
