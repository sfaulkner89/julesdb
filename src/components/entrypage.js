import React, { useState } from "react";
import { elements } from "../assets/entryElements";
import { storage, db } from "../assets/firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen.js";
import { v4 as uuidv4 } from "uuid";
import heic2any from "heic2any";
import { TextField, Button, IconButton } from "@mui/material";
import imageCompression from "browser-image-compression";
import { status } from "../assets/statuses";

const options = {
  maxSizeMB: 1,
};

const emptyObj = {
  Designer: "",
  Year: "",
  Notes: "",
  Country: "",
  Tags: "",
};

export default function EntryPage(props) {
  const [data, setData] = useState(emptyObj);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Starting up...");
  const [noFiles, setNoFiles] = useState(false);

  async function changeHandler(e, type, name) {
    console.log(e.target.files);
    if (type === "text") setData({ ...data, [name]: e.target.value });
    if (type === "file") setFiles(e.target.files);
  }

  async function submitHandler() {
    setLoading(files.length);
    console.log(files.length);
    const uuid = uuidv4();
    const imageArr = [];
    if (files.length > 0) {
      try {
        for (let file of files) {
          console.log(file);
          const extension = file.name.split(".")[1];
          if (extension === "HEIC") {
            setLoadingStatus(status.converting);
            file = await heic2any({
              blob: file,
              toType: "image/png",
              quality: 0.2,
            });
            console.log(file);
          }
          if (file && file.type.split("/")[0] !== "image") {
            throw new Error("not an image");
          }
          if (file.size > 1_000_000) {
            setLoadingStatus(status.compressing);
            const compressedFile = await imageCompression(file, options);
            console.log("After:", compressedFile.size / 1024 / 1024);
            file = compressedFile;
          }
          const imgDic = {};
          const fileuuid = uuidv4();
          const imageRef = ref(storage, `jewellery/${uuid}/${fileuuid}`);
          setLoadingStatus(status.uploading);
          const uploadFile = await uploadBytes(imageRef, file).catch((err) =>
            console.log(err)
          );
          console.log(uploadFile);
          Object.assign(imgDic, {
            ref: uploadFile.metadata.fullPath,
            url: await getDownloadURL(
              ref(storage, uploadFile.metadata.fullPath)
            ),
          });
          imageArr.push(imgDic);
          setLoading((loading) => loading - 1);
        }
        const dataToGo = {
          ...data,
          date: new Date(),
          id: uuid,
          image: imageArr,
        };
        const docRef = await addDoc(collection(db, "jewellery"), dataToGo);
        console.log(dataToGo);
        setData(emptyObj);
        props.setNewEntry(false);
      } catch (err) {
        setLoadingStatus(status.error);
        setTimeout(() => {
          setData(emptyObj);
          props.setNewEntry(false);
        }, 4000);
      }
    } else {
      setNoFiles(true);
      setTimeout(() => {
        setNoFiles(false);
      }, 3000);
    }
  }
  return loading > 0 ? (
    <LoadingScreen
      remaining={loading}
      totalFiles={files.length}
      status={loadingStatus}
    />
  ) : (
    <div className="formHolder">
      {elements
        .filter((element) => element.type === "text")
        .map((element) => {
          return (
            <div className="singleEntryDiv">
              <TextField
                sx={{ width: "75vh" }}
                type={element.type}
                value={data[element.name]}
                placeholder={element.name}
                onChange={(e) => changeHandler(e, element.type, element.name)}
              />
            </div>
          );
        })}
      <div className="uploadHolder">
        <Button variant="contained" component="label">
          Upload
          <input
            hidden
            multiple
            type="file"
            onChange={(e) => changeHandler(e, "file", "Photos")}
          />
        </Button>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
        </IconButton>{" "}
        <p style={{ color: props.dark ? props.lightColor : props.darkColor }}>
          {files.length} files selected
        </p>
        {files.length
          ? Array.from(files).map((photog) => {
              console.log(photog);
              return (
                <img
                  className="previewimg"
                  src={URL.createObjectURL(photog)}
                ></img>
              );
            })
          : ""}
      </div>
      <div className="submitHolder">
        <Button onClick={submitHandler}>Submit</Button>
        {noFiles ? (
          <div
            style={{
              backgroundColor: "darkred",
              padding: "0.001em 0.3em 0.001em 0.3em",
              borderRadius: "10px",
            }}
          >
            <p>You need to add a picture babes...</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
