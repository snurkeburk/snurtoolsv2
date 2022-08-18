import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Months from "../compontents/sidebar/calendar/Months";
import AddTask from "../compontents/tasks/AddTask";
import Week from "../compontents/tasks/Week";
import { db } from "../services/firebase-config";
import "../styles/Task/Month.css";
function Tasks(u) {
  async function writeDays() {
    let week = 5;
    let Day = 9; // starts at 3 because the first day is the third day of the week
    for (let i = 1; i <= 28; i++) {
      if (Day == 7 || Day == 14 || Day == 21 || Day == 28) {
        // one day ahead
        week++;
      }
      const day = {
        day: Day,
        month: "March",
        week: week,
      };

      if (Day == 28) {
        i = 28;
      }

      Day++;
    }
  }

  async function writeWeeks(month) {
    for (let i = month.startDay; i <= month.endDay; i++) {
      if ((i - month.startDay + month.offset) % 7 == 0 && i != month.startDay) {
        month.startWeek++;
      }
      let Day = i;
      const day = {
        day: i,
        month: month.month,
        week: month.startWeek,
      };
      console.log(
        u.user +
          " => " +
          "tasks" +
          " => " +
          month.month +
          " => " +
          "week" +
          " => " +
          month.startWeek +
          " => " +
          i +
          " => " +
          "init"
      );
      await setDoc(
        doc(
          db,
          "users",
          u.user,
          "tasks",
          month.month.toString(),
          "week",
          month.startWeek.toString(),
          i.toString(),
          "init"
        ),
        day
      );
    }
  }

  useEffect(() => {
    const january = {
      startDay: 3,
      endDay: 31,
      startWeek: 1,
      endWeek: 5,
      month: "January",
      offset: 0,
    };
    const february = {
      startDay: 1,
      endDay: 28,
      startWeek: 5,
      endWeek: 9,
      month: "February",
      offset: 1,
    };
    // writeWeeks(february);
  }, []);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Month, setMonth] = useState([]);
  const [Day, setDay] = useState([]);
  async function fetchTasksFromDb() {
    // get the document called February
    const tasks = await getDoc(
      doc(db, "users", u.user, "tasks", "February", "week", "5", "1", "init")
    );
    setLoading(false);
  }

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
  const [viewing, setViewing] = useState("");
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
    fetchTasksFromDb().then(() => setLoading(false));
    getYear();
    getMonth();
  }, []);

  const [currentMonth, setCurrentMonth] = useState("August");
  const [index, setIndex] = useState(7);

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

  return <Week />;
}

export default Tasks;
