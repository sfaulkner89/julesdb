import React, { useEffect, useState } from "react";
import { elements } from "../assets/entryElements";
import FullscreenImage from "./FullscreenImage";
import InfoElement from "./InfoElement";
import { db } from "../assets/firebaseConfig";
import {
  deleteDoc,
  collection,
  query,
  doc,
  where,
  getDocs,
} from "firebase/firestore";

export default function EntryElement({
  entry,
  size,
  dark,
  lightColor,
  darkColor,
}) {
  const [url, setUrl] = useState([]);
  const [popOut, setPopOut] = useState();
  const [remove, setRemove] = useState(false);
  const [check, setCheck] = useState(false);
  const textElements = elements.filter((element) => element.type === "text");

  const removeHandler = async (entry) => {
    setRemove(true);
    const ref = collection(db, "jewellery");
    const q = query(ref, where("id", "==", entry.id));
    const qs = await getDocs(q);
    const docArray = [];
    qs.forEach((doc) => docArray.push(doc.id));
    const docRef = doc(db, "jewellery", docArray[0]);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    const urlGetter = async (images) => {
      console.log(images);
      const urlArray = [];
      for (const image of images) {
        urlArray.push(image.url);
      }
      setUrl(urlArray);
    };
    urlGetter(entry.image);
  }, []);
  return popOut ? (
    <FullscreenImage source={popOut} exitFullscreen={() => setPopOut()} />
  ) : url.length && !remove ? (
    <div
      className="entryContainer"
      style={{ border: `2px solid ${dark ? lightColor : darkColor}` }}
    >
      <div className="imagesContainer">
        {url.map((image, i) => {
          return (
            <div className="photoHolder">
              <img
                className="archiveImage"
                src={url[i]}
                title={url[i]}
                onClick={() => setPopOut(url[i])}
                style={{ width: `${size}vw` }}
              />
            </div>
          );
        })}
      </div>
      <div className="textContainer">
        <div className="infoContainer">
          {textElements.slice(0, 3).map((e, i) => {
            return (
              <InfoElement
                e={e}
                darkColor={darkColor}
                lightColor={lightColor}
                dark={dark}
                entry={entry}
              />
            );
          })}
        </div>
        <div className="notesContainer">
          {textElements.slice(3).map((e, i) => {
            return (
              <InfoElement
                e={e}
                darkColor={darkColor}
                lightColor={lightColor}
                dark={dark}
                entry={entry}
              />
            );
          })}
        </div>
      </div>
      {check ? (
        <div>
          <button
            className="checkButtonYes"
            onClick={() => removeHandler(entry)}
            style={{ color: dark ? lightColor : darkColor }}
          >
            Yes I'm sure
          </button>{" "}
          <button
            style={{ color: dark ? lightColor : darkColor }}
            className="checkButtonNo"
            onClick={() => setCheck(false)}
          >
            Oops don't do it!
          </button>
        </div>
      ) : (
        <button
          style={{ color: dark ? lightColor : darkColor }}
          className="removeButton"
          onClick={() => setCheck(true)}
        >
          remove
        </button>
      )}
    </div>
  ) : (
    ""
  );
}
