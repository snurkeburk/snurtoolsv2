import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { auth } from "./services/firebase-config";
const App = () => {
  // get the current uid
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
  }, []);

  return (
    <div className="app-header">
      <div className="App">{uid ? <Home user={user} /> : <Login />}</div>
    </div>
  );
};

export default App;
