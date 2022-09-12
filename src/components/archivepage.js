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
    let tempSearchOps = props.searchOps;
    if (tempSearchOps.length === 0) {
      tempSearchOps = ["Designer", "Year", "Country", "Notes", "Tags"];
    }
    if (props.search.length !== 0) {
      let sortedArray = [];
      for (let entry of data) {
        let wordArray = [];
        for (let op of tempSearchOps) {
          let elementWords = entry[op].split(" ");
          console.log(elementWords);
          wordArray.push(...elementWords);
        }
        console.log(props.search.split(" "));
        const searchWords = props.search.split(" ");
        let score = 0;
        for (let searchWord of searchWords) {
          score += wordArray.filter((word) => word === searchWord).length;
        }
        sortedArray.push({
          score: score,
          entry: entry,
        });
      }
      const matches = sortedArray.filter((entry) => entry.score !== 0);
      const sortedMatches = matches.sort((a, b) => b.score - a.score);
      setSortedData(sortedMatches);
      console.log(sortedMatches);
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
      {sortedData[0]?.score > 0
        ? sortedData.map((entry) => {
            return (
              <EntryElement
                size={props.size}
                entry={entry.entry}
                dark={props.dark}
                darkColor={props.darkColor}
                lightColor={props.lightColor}
              />
            );
          })
        : data.map((entry) => {
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
