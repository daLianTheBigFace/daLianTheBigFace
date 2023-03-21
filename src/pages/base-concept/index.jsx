import { useCallback, useState,  } from "react";
import moment from "moment";
import { useHistory  } from 'react-router-dom'
import "./Calendar.css";
const Index = () => {
  function myFn(e) {
    console.log(e || "防抖成功");
  }
  function debounce(fn, delay) {
    let timeout = null;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  const fn = useCallback(debounce(myFn, 500), []);
  const [date, setDate] = useState(moment());
  const prevMonth = () => {
    setDate(date.clone().subtract(1, "month"));
  };
  const nextMonth = () => {
    setDate(date.clone().add(1, "month"));
  };
  const renderCalendarHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth}>Prev</button>
        <div className="calendar-title">{date.format("MMMM YYYY")}</div>
        <button onClick={nextMonth}>Next</button>
      </div>
    );
  };
  const renderCalendarDays = () => {
    const weekdays = moment.weekdays();
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(<div className="calendar-day-header">{weekdays[i]}</div>);
    }
    return <div className="calendar-days">{days}</div>;
  };
  const renderCalendarCells = () => {
    const monthStart = date.clone().startOf("month");
    const monthEnd = date.clone().endOf("month");
    const currentDay = moment();
    const startDiff = monthStart.weekday();
    const endDiff = 6 - monthEnd.weekday();
    const totalDays = monthEnd.diff(monthStart, "days") + 1;
    const days = [];
    for (let i = 0; i < startDiff; i++) {
      days.push(<div className="calendar-cell-empty"></div>);
    }
    for (let i = 1; i <= totalDays; i++) {
      const day = monthStart.clone().add(i - 1, "days");
      const isCurrentMonth = day.month() === date.month();
      const isToday = day.isSame(currentDay, "day");
      const classNames = [
        "calendar-cell",
        isCurrentMonth ? "current-month" : "other-month",
        isToday ? "today" : "",
      ].join(" ");
      days.push(<div className={classNames}>{i}</div>);
    }
    for (let i = 0; i < endDiff; i++) {
      days.push(<div className="calendar-cell-empty"></div>);
    }
    return <div className="calendar-cells">{days}</div>;
  };
  const history = useHistory()
  return (
    <div>
      <div className="calendar">
        {renderCalendarHeader()}
        {renderCalendarDays()}
        {renderCalendarCells()}
      </div>
      <input type="text" onChange={(e) => fn(e.target.value)} />
      <button onClick={()=>{
        history.push('./game')
      }}>game</button>
    </div>
  );
};
export default Index;
