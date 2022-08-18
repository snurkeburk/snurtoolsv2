import React from "react";
import { useState } from "react";
import { auth, storage } from "../../services/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/Sidebar/Settings.css";
import { signOut } from "firebase/auth";
import { BsFillCloudUploadFill, BsFillDoorClosedFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
function Settings(u) {
  const [imageUpload, setImageUpload] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const uploadImage = () => {
    if (imageUpload == null) {
      return;
    }
    const imageRef = ref(
      storage,
      `users/${u.user.uid}/images/profile/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      setImageUpload(null);
      alert("Image uploaded");
    });
  };
  const uploadBackground = () => {
    if (imageUpload == null) {
      return;
    }
    const imageRef = ref(
      storage,
      `users/${u.user.uid}/images/background/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      setImageUpload(null);
      alert("Image uploaded");
    });
  };
  return (
    <div>
      <AnimatePresence initial={true}>
        {!isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="settings-button-container"
          >
            <button onClick={() => signOut(auth)}>
              <BsFillDoorClosedFill />
            </button>
            <button onClick={() => setIsVisible(!isVisible)}>
              <FiSettings />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="settings-container"
          >
            <p>Settings:</p>
            <motion.div className="settings-inner profileImage">
              <p>Edit profile picture:</p>
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <button onClick={uploadImage}>
                <BsFillCloudUploadFill />
              </button>
            </motion.div>
            <motion.div className="settings-inner backgroundImage">
              <p>Edit background picture:</p>

              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <button onClick={uploadBackground}>
                <BsFillCloudUploadFill />
              </button>
            </motion.div>
            <button
              id="settings-close"
              onClick={() => setIsVisible(!isVisible)}
            >
              <RiCloseLine />{" "}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Settings;
