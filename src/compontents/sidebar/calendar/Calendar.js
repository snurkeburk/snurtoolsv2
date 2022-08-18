import React, { useEffect, useState } from "react";
import "../../../styles/Task/Month.css";
import { AnimatePresence, motion } from "framer-motion";
import { BsCalendar2 } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillCaretRight, AiFillCloseCircle } from "react-icons/ai";
import AddTask from "../../tasks/AddTask";
import Clock from "react-live-clock";

function Calendar(props) {
  const [Day, setDay] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);
  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    setCurrentDay(day);
  }, [currentDay]);

  const variants = {
    hidden: {
      opacity: 1,
      scaleX: 0.25,
      scaleY: 0.25,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const [addTask, setAddTask] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [Index, setIndex] = useState([]);
  useEffect(() => {
    if (!showAddTask && Day.length > 0) {
      setShowAddTask(true);
    }
  }, [Day]);
  const [Offset, setOffset] = useState([]);
  const offArr = [];
  const [OffsetEnd, setOffsetEnd] = useState([]);
  useEffect(() => {
    setOffset([]);
    setOffsetEnd([]);
    for (let i = 0; i < props.offset; i++) {
      offArr.push(i);
    }
    setOffset(offArr);
    // calculate offset end days
    let endDays = 42 - props.offset - props.months.length;
    console.log(42, props.offset, props.months.length, endDays);
    let endArr = [];
    for (let i = 0; i < endDays; i++) {
      endArr.push(i);
    }
    setOffsetEnd(endArr);
  }, [props.offset, props.months.length]);
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="Month"
      >
        <motion.div
          variants={variants}
          initial="hidden"
          animate={"visible"}
          exit="exit"
          className="month-item Month-header"
        >
          <div className="month-item month-current">
            <h5>2022</h5>
            <h5>/</h5>
            <h5>{props.month}</h5>
          </div>
          <div>
            <Clock
              className="calendar-clock"
              format={"HH:mm"}
              ticking={true}
              timezone={"Europe/Stockholm"}
            />
            <Clock
              className="calendar-clock-seconds"
              format={":ss"}
              ticking={true}
              timezone={"Europe/Stockholm"}
            />
          </div>

          <div className="month-day-container">
            {Offset.map((offday, index) => (
              <div className="month-day offset" key={index}></div>
            ))}
            {props.months.map((day, index) => {
              return (
                <motion.button
                  whileHover={{
                    scale: 1.2,
                  }}
                  whileTap={!addTask ? { scale: 1 } : { scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 1000 }}
                  className="month-day"
                  style={
                    day == props.today && props.isCurrentMonth
                      ? { backgroundColor: "rgba(108, 212, 207, 0.226)" }
                      : {}
                  }
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setIndex((prev) => [
                      ...prev,
                      { day: day, index: index, selected: false },
                    ]);
                  }}
                  key={index}
                >
                  {day == props.today && props.isCurrentMonth ? (
                    <div className="today">
                      <p>
                        <p style={{ fontSize: "0.5rem" }}>{index}</p>
                        {day}
                      </p>
                    </div>
                  ) : (
                    <p>
                      <p style={{ fontSize: "0.5rem" }}>{index}</p>
                      {day}
                    </p>
                  )}

                  <div>
                    {Index.map((item, i) => {
                      if (
                        item.day == day &&
                        item.index == index &&
                        !item.selected
                      ) {
                        return (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1 }}
                            onClick={() => {
                              setDay((Day) => [...Day, day]);
                              // update the object in the Index array where day is equal to the day in the clicked button
                              setIndex((prev) => {
                                return prev.map((item) => {
                                  if (item.day == day && item.index == index) {
                                    return {
                                      ...item,
                                      selected: !item.selected,
                                    };
                                  } else {
                                    return item;
                                  }
                                });
                              });
                            }}
                            className="add-task-icon-small"
                          >
                            <IoMdAddCircle size={20} />
                          </motion.div>
                        );
                      } else if (
                        item.day == day &&
                        item.index == index &&
                        item.selected
                      ) {
                        return (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1 }}
                            onClick={() => {
                              // remove the object from the Index array where day is equal to the day in the clicked button
                              setIndex((prev) => {
                                return prev.filter((item) => {
                                  return item.day != day || item.index != index;
                                });
                              });

                              // remove the day from the Day array
                              setDay((Day) => {
                                return Day.filter((item) => {
                                  return item != day;
                                });
                              });
                            }}
                            style={{
                              color: "rgba(62, 247, 176, 0.795)",
                            }}
                            className="add-task-icon-small"
                          >
                            <IoMdAddCircle size={20} />
                          </motion.div>
                        );
                      }
                    })}
                  </div>
                </motion.button>
              );
            })}
            {OffsetEnd.map((day, index) => (
              <div className="month-day offset" key={index}></div>
            ))}
          </div>
        </motion.div>
        <div
          style={{
            position: "absolute",
            left: "420px",
            top: "300px",
          }}
        >
          {!showAddTask && Day.length > 0 && (
            <motion.button
              style={{
                color: "rgba(62, 247, 176, 0.795)",
                background: "none",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "none",
                justifyContent: "space-around",
              }}
              whileHover={{ scale: 1.2, cursor: "pointer" }}
              whileTap={{ scale: 1 }}
              onClick={() => {
                setShowAddTask(true);
              }}
            >
              <p>{Day.length}</p>
              <IoMdAddCircle size={40} />
              <AiFillCaretRight
                style={{
                  marginLeft: "-17px",
                }}
                size={30}
              />
            </motion.button>
          )}
        </div>
        <AnimatePresence exitBeforeEnter>
          {showAddTask && Day.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                left: "50vw",
                top: "50%",
                transform: "translate(-10vw, -20vh)",
                width: "40vw",
                height: "45vh",
                backgroundColor: "#f3f3f310",
                backdropFilter: "blur(25px)",
                borderRadius: "1rem",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <motion.button
                whileHover={{
                  color: "rgba(255, 255, 255, 0.7)",
                }}
                className="calendar-show-add-task-button"
                onClick={() => setShowAddTask(false)}
              >
                <AiFillCloseCircle />
              </motion.button>
              <AddTask
                day={Day}
                show={showAddTask}
                month={props.month}
                user={props.user}
                profile={props.profile}
              ></AddTask>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default Calendar;
