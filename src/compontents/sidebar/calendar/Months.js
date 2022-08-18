import React, { useEffect, useState } from "react";
import "../../../styles/Task/Month.css";
import { motion } from "framer-motion";

import Calendar from "./Calendar";

function Months(props) {
  const [months, setMonths] = useState([]);
  const [day, setDay] = useState(null);
  const [longMonth, setLongMonth] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]);
  const [midMonth, setMidMonth] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ]);
  const [shortMonth, setShortMonth] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
  ]);
  const [Offset, setOffset] = useState(0);

  useEffect(() => {
    let offset = 0;
    switch (props.month) {
      case "January":
        setMonths(longMonth);
        offset = 5;
        break;
      case "February":
        setMonths(shortMonth);
        offset = 1;
        break;
      case "March":
        setMonths(longMonth);
        offset = 1;
        break;
      case "April":
        setMonths(midMonth);
        offset = 4;
        break;
      case "May":
        setMonths(longMonth);
        offset = 6;
        break;
      case "June":
        setMonths(midMonth);
        offset = 2;
        break;
      case "July":
        setMonths(longMonth);
        offset = 4;
        break;
      case "August":
        setMonths(longMonth);
        offset = 0;
        break;
      case "September":
        setMonths(midMonth);
        offset = 3;
        break;
      case "October":
        setMonths(longMonth);
        offset = 5;
        break;
      case "November":
        setMonths(midMonth);
        offset = 1;
        break;
      case "December":
        setMonths(longMonth);
        offset = 3;
        break;
    }
    setOffset(offset);
  });
  const [today, setToday] = useState(null);
  const [week, setWeek] = useState(null);
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  useEffect(() => {
    const current = new Date();
    const startDate = new Date(current.getFullYear(), 0, 1);
    var days = Math.floor((current - startDate) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);
    if (props.index + 1 == current.getMonth() + 1) {
      setIsCurrentMonth(true);
    } else {
      setIsCurrentMonth(false);
    }
    setWeek(weekNumber);
    setToday(current.getDate());
  });
  return (
    <div>
      <Calendar
        width={props.width}
        month={props.month}
        offset={Offset}
        week={week}
        months={months}
        index={props.index}
        today={today}
        isCurrentMonth={isCurrentMonth}
        user={props.user}
        profile={props.profile}
      />
    </div>
  );
}

export default Months;
