import React, { useEffect, useState } from "react";
import Profile from "../compontents/sidebar/Profile";
import Settings from "../compontents/sidebar/Settings";
import { motion, transform } from "framer-motion";
import { CgChevronDoubleRight } from "react-icons/cg";
import Months from "../compontents/sidebar/calendar/Months";
import "../styles/Sidebar/Sidebar.css";
import FriendList from "../compontents/sidebar/FriendList/FriendList";
function Sidebar(u) {
  const [width, setWidth] = useState("75px");
  const [Month, setMonth] = useState([]);
  const [Day, setDay] = useState([]);
  function getYear() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = 1; i <= 12; i++) {
      // if Month > 12, remove everything after 12
      if (Month.length > 12) {
        setMonth(Month.slice(0, 12));
      }
      Month.push(...[months[i - 1]]);
    }
  }
  function getMonth() {
    for (let i = 1; i <= 31; i++) {
      Day.push(...[i]);
    }
  }
  const [view, setView] = useState("year");
  const [currentDay, setCurrentDay] = useState(null);
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
  useEffect(() => {
    getYear();
    getMonth();
  }, []);
  const [closedWidth, setClosedWidth] = useState("75px");
  const [openWidth, setOpenWith] = useState("300px");
  useEffect(() => {
    // get current day
    const date = new Date();
    const day = date.getDate();
    setCurrentDay(day);
  });

  /* CALENDAR */
  const [currentMonth, setCurrentMonth] = useState("January");
  const [index, setIndex] = useState(1);

  const Switch = (option) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = 0; i < months.length; i++) {
      if (months[i] == currentMonth) {
        if (option == "next") {
          setCurrentMonth(months[i + 1]);
          setIndex(i + 1);
        } else {
          setCurrentMonth(months[i - 1]);
          setIndex(i - 1);
        }
      }
    }
  };
  return (
    <motion.div id="Sidebar">
      {/* <button
        id="sidebar-toggle"
        onClick={() => {
          width == openWidth ? setWidth(closedWidth) : setWidth(openWidth);
        }}
      >
        <CgChevronDoubleRight
          style={
            width == closedWidth
              ? { transform: "rotate(0deg)" }
              : { transform: "rotate(180deg)" }
          }
        />
      </button> */}
      <div className="Calendar-container">
        <div>
          <Months
            month={currentMonth}
            index={index}
            user={u.user}
            width={width}
            profile={u.profile}
          />
        </div>
        <div className="calendar-buttons">
          <button onClick={() => Switch("previous")}>{"<"}</button>
          <button onClick={() => Switch("next")}>{">"}</button>
        </div>
      </div>
      <div className="Profile-container">
        <div className="Profile">
          <Profile user={u.user} profile={u.profile} />
        </div>
        <motion.div className="friend-list">
          <FriendList user={u.user} />
        </motion.div>

        <div className="Settings">
          <Settings user={u.user} />
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
