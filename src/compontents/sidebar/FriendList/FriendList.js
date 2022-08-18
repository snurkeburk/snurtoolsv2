import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../../styles/Sidebar/FriendList.css";
import { FetchFriendsFromDb } from "./FetchFriends";
function FriendList(u) {
  const [loading, setLoading] = useState(true);
  const [Friends, setFriends] = useState([]);

  useEffect(() => {
    if (u) {
      FetchFriendsFromDb(u).then((friends) => {
        setFriends(friends);
      });
    }
    setLoading(false);
  }, [loading]);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="friend-list">
        {Friends.length > 0 ? (
          Friends.map((friend, index) => (
            <motion.div key={index} className="friend-list-item">
              <img
                className="friend-image"
                src={friend.profilePicture}
                alt="profile-picture"
              />
              <div className="friend-list-name">
                <motion.p>{friend.username}</motion.p>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No friends</p>
        )}
      </div>
    );
  }
}
export default FriendList;
