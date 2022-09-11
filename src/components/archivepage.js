import React, { useEffect, useState } from "react";
import EntryElement from "./EntryElement";
import { db } from "../assets/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

export default function ArchivePage(props) {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    sortData();
  }, [props.search, props.searchOps]);

  const sortData = () => {
    if (props.search.length !== 0) {
      let sortedArray = [];
      for (let entry of data) {
        let wordArray = [];
        for (let op of props.searchOps) {
          console.log(entry);
          console.log(op);
          let elementWords = entry[op].split(" ");
          console.log(elementWords);
          wordArray.push(elementWords);
        }
        console.log(String(props.search));
        sortedArray.push({
          score: wordArray.filter((word) => word === "1989").length,
          entry: entry,
        });
      }
      sortedArray.sort((a, b) => b.score - a.score);
      console.log(sortedArray);
    }
  };
  const loadData = async () => {
    const jewelleryData = collection(db, "jewellery");
    const datastuff = await getDocs(jewelleryData);
    const jewelArray = [];
    datastuff.forEach((entry) => {
      const data = entry.data();
      jewelArray.push(data);
    });
    setData(jewelArray || []);
  };

  return (
    <div>
      {data.map((entry) => {
        return (
          <EntryElement
            size={props.size}
            entry={entry}
            dark={props.dark}
            darkColor={props.darkColor}
            lightColor={props.lightColor}
          />
        );
      })}
    </div>
  );
}
