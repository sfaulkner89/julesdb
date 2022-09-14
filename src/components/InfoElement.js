import {
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../assets/firebaseConfig";

export default function InfoElement({ e, darkColor, lightColor, dark, entry }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(entry[e.name]);

  const editHandler = async (entry, name) => {
    setEdit(!edit);
    const ref = collection(db, "jewellery");
    const q = query(ref, where("id", "==", entry.id));
    const qs = await getDocs(q);
    const docArray = [];
    qs.forEach((doc) => docArray.push(doc.id));
    const docRef = doc(db, "jewellery", docArray[0]);
    await updateDoc(docRef, {
      [name]: value,
    });
  };

  return (
    <div className="singleDataHolder">
      <button
        onClick={() => editHandler(entry, e.name)}
        className="editButton"
        style={{ color: dark ? lightColor : darkColor }}
      >
        {edit ? "done" : "edit"}
      </button>
      <h4
        className="singleDataH4"
        style={{
          color: dark ? lightColor : darkColor,
        }}
      >
        {e.name}
      </h4>
      {edit ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="editInput"
        />
      ) : (
        <p
          className="singleDataP"
          style={{
            color: dark ? lightColor : darkColor,
          }}
        >
          {value}
        </p>
      )}
    </div>
  );
}
