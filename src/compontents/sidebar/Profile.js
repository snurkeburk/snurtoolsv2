import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../../services/firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import "../../styles/Sidebar/Profile.css";
function Profile(u) {
  const [profileImage, setProfileImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  useEffect(() => {
    const imageListRef = ref(storage, `users/${u.user.uid}/images/profile`);
    listAll(imageListRef)
      .then((images) => {
        getDownloadURL(images.items[0]).then((url) => {
          setProfileImage(url);
          setLoadingImage(false);
        });
      })
      .catch(() => {
        setLoadingImage(false);
      });
  }, []);
  return (
    <div id="Profile">
      <div>
        {loadingImage ? (
          <p>Loading...</p>
        ) : (
          <img src={profileImage} alt="profile" />
        )}
        <p className="profile-username">{u.profile.username}</p>
      </div>
    </div>
  );
}

export default Profile;
