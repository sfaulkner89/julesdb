import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../assets/firebaseConfig";
import { elements } from "../assets/entryElements";
import FullscreenImage from "./FullscreenImage";

export default function EntryElement({
  entry,
  size,
  dark,
  lightColor,
  darkColor,
}) {
  const [url, setUrl] = useState([]);
  const [popOut, setPopOut] = useState();
  const textElements = elements.filter((element) => element.type === "text");
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
  ) : url.length ? (
    <div className="entryContainer">
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
              <div className="singleDataHolder">
                <h4
                  className="singleDataH4"
                  style={{
                    color: dark ? lightColor : darkColor,
                  }}
                >
                  {e.name}
                </h4>
                <p
                  className="singleDataP"
                  style={{
                    color: dark ? lightColor : darkColor,
                  }}
                >
                  {entry[e.name]}
                </p>
              </div>
            );
          })}
        </div>
        <div className="notesContainer">
          {textElements.slice(3).map((e, i) => {
            return (
              <div className="singleDataHolder">
                <h4
                  className="singleDataH4"
                  style={{
                    color: dark ? lightColor : darkColor,
                  }}
                >
                  {e.name}
                </h4>
                <p
                  className="singleDataP"
                  style={{
                    color: dark ? lightColor : darkColor,
                  }}
                >
                  {entry[e.name]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    "One Sec Jules!"
  );
}
