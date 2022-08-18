import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../../styles/Task/Week.css";
import { FaRegDotCircle } from "react-icons/fa";

function Week() {
  const task = [
    {
      id: 1,
      day: "Monday",
      date: "1",
      month: "January",
      year: "2020",
      title: "Task 1",
      description: "Description 1",
      time: "12:00",
      end: "20:00",
      additional: "Additional 1",
      snurs: "1",
      comment: "Comment 1",
      color: "Color 1",
    },
    {
      id: 2,
      day: "Thursday",
      date: "1",
      month: "January",
      year: "2020",
      title: "Task 3",
      description: "Description 1",
      time: "12:00",
      end: "18:00",
      additional: "Additional 1",
      snurs: "1",
      comment: "Comment 1",
      color: "Color 1",
    },
    {
      id: 3,
      day: "Tuesday",
      date: "1",
      month: "January",
      year: "2020",
      title: "Task 2",
      description: "Description 1",
      time: "12:00",
      end: "12:00",
      additional: "Additional 1",
      snurs: "1",
      comment: "Comment 1",
      color: "Color 2",
    },
    {
      id: 4,
      day: "Wednesday",
      date: "1",
      month: "January",
      year: "2020",
      title: "Task 2",
      description: "Description 1",
      time: "06:00",
      end: "12:00",
      additional: "Additional 1",
      snurs: "1",
      comment: "Comment 1",
      color: "Color 2",
    },
    {
      id: 5,
      day: "Monday",
      date: "1",
      month: "January",
      year: "2020",
      title: "Task 2",
      description: "Description 1",
      time: "06:00",
      end: "18:00",
      additional: "Additional 1",
      snurs: "1",
      comment: "Comment 1",
      color: "Color 2",
    },
    {
      id: 6,
      day: "Saturday",
      date: "1",
      month: "January",
      year: "2020",
      title: "Task 2",
      description: "Description 1",
      time: "06:00",
      end: "18:00",
      additional: "Additional 1",
      snurs: "1",
      comment: "Comment 1",
      color: "Color 2",
    },
  ];
  const [tasks, setTasks] = useState(task);
  const timeLineRef = useRef(null);
  const [timeLineHeight, setTimeLineHeight] = useState(0);
  useEffect(() => {
    // event listener for window resize
    window.addEventListener("resize", () => {
      setTimeLineHeight(timeLineRef.current.offsetHeight);
    });
    setTimeLineHeight(timeLineRef.current.offsetHeight);
    setTasks(task);
  }, [timeLineHeight]);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [y, setY] = useState([]);
  function setTaskY(t, index) {
    let H = timeLineHeight;
    let T = parseInt(t.split(":")[0]);
    let hour = H / 24;
    return hour * T;
  }
  function setTaskEndY(t, index, s) {
    let H = timeLineHeight;
    let T = parseInt(t.split(":")[0]);
    let hour = H / 24;
    return hour * T - s;
  }
  // create a ref for the p element with the id "time"

  return (
    <div className="Week-header">
      <motion.div className="week-container" ref={timeLineRef}>
        <motion.div className="week-timeline-vertical-container">
          <p>00:00</p>

          <p>03:00</p>
          <p>06:00</p>
          <p>09:00</p>

          <p>12:00</p>

          <p>15:00</p>
          <p>18:00</p>
          <p>21:00</p>

          <p>00:00</p>
        </motion.div>
        <motion.div className="week-timeline-horizontal-container">
          {days.map((day, index) => (
            <div className="week-day" key={index}>
              <p>{day}</p>
              {tasks.map(
                (task, index) =>
                  task.day == day && (
                    <motion.div
                      initial={{ y: 0, position: "absolute", width: "10rem" }}
                      animate={{
                        y: `calc( ${setTaskY(task.time, index)}px - 30px
                        )`,
                      }}
                      key={index}
                      className="week-task"
                    >
                      <p>{task.title}</p>
                      <p>
                        {task.time} - {task.end}
                      </p>
                      <p>{task.snurs}</p>
                      <motion.div
                        className="task-line"
                        initial={{ y: 0 }}
                        animate={{
                          height: `calc( ${setTaskEndY(
                            task.end,
                            index,
                            setTaskY(task.time, index)
                          )}px - 35px)`,
                        }}
                        style={{
                          width: "1px",
                          zIndex: "1",
                          position: "absolute",
                          left: "50%",
                          backgroundColor: "rgba(135, 199, 255, 0.75)",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-end",
                          color: "white",
                        }}
                      >
                        <FaRegDotCircle
                          style={{
                            position: "absolute",
                            bottom: "-14px",
                            left: "-6.5px",
                            color: "rgba(135, 199, 255, 1)",
                          }}
                        />
                        <p
                          style={{
                            position: "absolute",
                            bottom: "-16px",
                            paddingLeft: "10px",
                          }}
                        >
                          {task.end}
                        </p>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Week;
