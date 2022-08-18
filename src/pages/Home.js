import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../services/firebase-config";
import Sidebar from "./Sidebar";
import "../styles/Home/Home.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Tasks from "./Tasks";
const Home = (u) => {
  const [username, setUsername] = useState("");
  const [background, setBackground] = useState(null);
  const [loadingBackground, setLoadingBackground] = useState(true);
  const [snurs, setSnurs] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProfileFromDb().then(() => setLoading(false));
    fetchBackgroundFromDb();
  }, [loading]);
  const fetchProfileFromDb = async () => {
    const user = await getDoc(doc(db, "users", u.user.uid));
    setUsername(user.data().username);
    setSnurs(user.data().snurs);
    setTag(user.data().tag);
  };
  const fetchBackgroundFromDb = () => {
    const imageListRef = ref(storage, `users/${u.user.uid}/images/background`);
    listAll(imageListRef)
      .then((images) => {
        getDownloadURL(images.items[0]).then((url) => {
          setBackground(url);
          setLoadingBackground(false);
        });
      })
      .catch(() => {
        setLoadingBackground(false);
      });
  };

  return (
    <div
      className="Home"
      style={
        !loadingBackground ? { backgroundImage: `url(${background})` } : {}
      }
    >
      {loadingBackground ? (
        <div className="loading-background">
          <h1>loading background...</h1>
        </div>
      ) : background == null ? (
        <div className="loading-background">
          <h1>no background image :/</h1>
        </div>
      ) : (
        <p></p>
      )}
      <div className="home-container">
        <Sidebar
          user={u.user}
          profile={{ username: username, snurs: snurs, tag: tag }}
        />
        <Tasks user={u.user.uid} />
      </div>
    </div>
  );
};
export default Home;
