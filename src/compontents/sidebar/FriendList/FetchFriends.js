import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase-config";

export const FetchFriendsFromDb = async (u) => {
  const user = await getDoc(doc(db, "users", u.user.uid));
  const friends = user.data().friends;
  const friendList = [];
  const _friend = [];
  // getting username and online status
  for (let i = 0; i < friends.length; i++) {
    const friend = await getDoc(doc(db, "users", friends[i]));
    friendList.push(friend.data());
    // getting profile pictures
    _friend.push({
      username: friendList[i].username,
      online: friendList[i].online,
      profilePicture: friendList[i].profilePicture,
      status: friendList[i].status,
      uid: friendList[i].uid,
    });
  }
  return _friend;
};
