import React from "react";
import { db } from "../../services/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
export const checkUserExists = async (u) => {
  // check DB for user ID
  const user = await getDoc(doc(db, "users", u.uid));
  if (!user.data()) {
    // Adds user to DB
    const userData = {
      name: u.displayName,
      dateCreated: new Date(),
      snurs: 10,
      email: u.email,
      username: "",
      friends: [], //TODO? add tutorial Ederraviel as friend from beginning
      uid: u.uid,
      online: false,
    };
    await setDoc(doc(db, "users", u.uid), userData);
  }
};

export const getUser = async (u) => {
  const user = await getDoc(doc(db, "users", u.uid));
  return user.data();
};
