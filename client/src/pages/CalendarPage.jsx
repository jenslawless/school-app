import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarPage() {
  return (
    <>
      <div className="pl-24 pt-8">
        <Calendar />
      </div>
    </>
  );
}

export default CalendarPage;
