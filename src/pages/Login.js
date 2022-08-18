import React from "react";
import App from "../App";
import {
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../services/firebase-config";
import { Link } from "react-router-dom";
import { checkUserExists } from "../compontents/authentication/user";
// console.log(auth.lastNotifiedUid) kan användas för att se vilken användare som är inloggad
const Login = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((re) => {
        checkUserExists(re.user);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <p>Sign in</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
export default Login;
