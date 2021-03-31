import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const WeeklyCalendar = ({ handleSetNextWeek, handleSetPreviousWeek }) => {
  return (
    <div className="calendar">
      <div className="calendar__navigations">
        <div className="calendar__navigations__previous-week">
          <FiArrowLeft onClick={handleSetPreviousWeek} />
        </div>
        <div className="calendar__navigations__start-day">
          <label htmlFor="startDay">Start Day: </label>{" "}
          <select value="Monday" name="startDay">
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
        </div>
        <div className="calendar__navigations__next-week">
          <FiArrowRight onClick={handleSetNextWeek} />
        </div>
      </div>
      <div className="calendar__header"></div>
      <div className="calendar__body"></div>
    </div>
  );
};

export default WeeklyCalendar;
