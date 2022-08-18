import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import "../../styles/Task/AddTask.css";
import { motion } from "framer-motion";
import { FetchFriendsFromDb } from "../sidebar/FriendList/FetchFriends";
import { getUser } from "../authentication/user";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function AddTask(props) {
  const [target, setTarget] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [Index, setIndex] = useState(0);
  const pages = [
    "Title",
    "Description",
    "Time",
    "Additional",
    "Snurs",
    "Comment",
    "Color",
  ];
  const [option, setOption] = useState(pages[0]);
  function switchTab(index) {
    setIndex(index);
    setIsVisible(false);
    // wait 1 second then set isVisible to true
    setTimeout(() => setIsVisible(true), 100);
  }
  const handleInput = (event) => {
    setTarget((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      uid: props.user.uid,
      day: props.day,
    }));
  };
  const uploadTask = () => {
    const task = {
      title: target.Title,
      description: target.Description,
      time: target.Time,
      additional: target.Additional,
      snurs: target.Snurs,
      comment: target.Comment,
      color: target.Color,
      added_by_uid: props.user.uid,
      added_by_username: props.profile.username,
      day: props.day,
      month: props.month,
      week: props.week,
      users: selectedUsers,
    };
    console.log(task);
    // users --> uid --> tasks --> props.month --> week --> props.day
  };
  const [Friends, setFriends] = useState([]);
  const [User, setUser] = useState([]);
  const [Options, setOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    getUser(props.user)
      .then((user) => {
        setUser([
          {
            username: user.username,
            profilePicture: user.profilePicture,
            uid: user.uid,
            online: user.online,
            status: user.status,
          },
        ]);
        setSelectedUsers([
          {
            username: user.username,
            profilePicture: user.profilePicture,
            uid: user.uid,
            online: user.online,
            status: user.status,
          },
        ]);
      })
      .catch((error) => {
        console.log("Error fetching username: " + error);
      });
    FetchFriendsFromDb(props).then((friends) => {
      setFriends(friends);
    });
  }, []);
  useEffect(() => {
    // merge friends and user into one array
    if (Friends.length > 0 && User.length > 0) {
      const opts = [User[0]];
      Friends.forEach((friend) => {
        opts.push(friend);
      });
      if (opts.length > 0) {
        setOptions(opts);
      }
    }
  }, [Friends, User]);
  return (
    props.show &&
    props.day.length > 0 && (
      <div className="Add-task-header">
        <div className="add-task-top-container">
          <div className="add-task-info-container">
            <p>
              Add task for {props.month}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.day.map((day, i) => {
                  return (
                    <p
                      key={i}
                      style={{
                        padding: "0 0.2rem",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        margin: "0 0.2rem",
                        borderRadius: "2rem",
                        width: "20px",
                      }}
                    >
                      {day}
                    </p>
                  );
                })}
              </div>
            </p>
            <div className="add-task-top-friends-container">
              {User.length > 0 && Friends.length > 0 && Options.length > 0 ? (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  limitTags={2}
                  options={Options}
                  getOptionLabel={(option) =>
                    option.username === User[0].username
                      ? option.username + " (You)"
                      : option.username
                  }
                  onChange={(event, value) => {
                    return setSelectedUsers(value);
                  }}
                  defaultValue={Options.length > 0 && [Options[0]]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Add this task for: "
                      placeholder="Users"
                    />
                  )}
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
        <div className="add-task-container">
          <AnimatePresence exitBeforeEnter>
            {isVisible && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h1>{option}</h1>
                <p
                  style={{
                    display: "flex",
                  }}
                >
                  Enter your
                  <p
                    style={{
                      padding: "0 0.2rem",
                    }}
                  >
                    {option.toLowerCase()}
                  </p>
                  here
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            className="add-task-input"
            onChange={handleInput}
            id={option}
            name={option}
            value={target[option] ? target[option] : ""}
            placeholder={option === "Time" ? "hh:mm" : ""}
          />
          <div className="add-task-button-container">
            {option == pages[0] ? (
              <></>
            ) : (
              <motion.button
                onClick={() => {
                  switchTab(Index - 1);
                  setOption(pages[Index - 1]);
                }}
                whileHover={{ scale: 1.2 }}
              >
                <p>Previous</p>
              </motion.button>
            )}
            {option == pages[pages.length - 1] ? (
              <motion.button
                className="add-task-button-done"
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  uploadTask();
                }}
              >
                <p>Done</p>
              </motion.button>
            ) : (
              <motion.button
                onClick={() => {
                  switchTab(Index + 1);
                  setOption(pages[Index + 1]);
                }}
                whileHover={{ scale: 1.2 }}
              >
                <p>Next</p>
              </motion.button>
            )}
          </div>
        </div>
        <div className="add-task-tabs-container">
          {pages.map((page, index) => (
            <div
              className={`add-task-tab ${page}`}
              onClick={() => setOption(page)}
              key={index}
            >
              {page == option ? (
                <p style={{ backgroundColor: "rgba(62, 247, 176, 0.995)" }}></p>
              ) : (
                <p
                  onClick={() => switchTab(index)}
                  style={{ backgroundColor: "rgba(62, 247, 176, 0.195)" }}
                ></p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default AddTask;
