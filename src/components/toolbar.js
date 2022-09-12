import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import {
  Input,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  createStyles,
  Button,
} from "@mui/material";
import { elements } from "../assets/entryElements";

export default function Toolbar(props) {
  const [newEntry, setNewEntry] = useState(false);
  const textElements = elements.filter((element) => element.type === "text");

  function pagehandler() {
    props.page();
  }

  function sizeHandler(value) {
    window.localStorage.setItem("picSize", value);
    props.setSize(value);
  }

  function darkHandler(value) {
    window.localStorage.setItem("darkMode", value);
    props.setDark(value);
  }

  const pressHandler = (e, selection) => {
    props.setSearchOps(selection);
  };

  return (
    <div
      className="toolbarHolder"
      style={{
        backgroundColor: !props.dark ? props.lightColor : props.darkColor,
      }}
    >
      <div className="switchHolder">
        <p
          style={{
            color: props.dark ? props.lightColor : props.darkColor,
          }}
        >
          Dark Mode
        </p>
        <Switch
          size="small"
          onChange={(e) => darkHandler(e.target.checked)}
          color="success"
          checked={props.dark}
        />
      </div>
      {!props.newEntry ? (
        <div className="slideHolder">
          <p
            style={{
              color: props.dark ? props.lightColor : props.darkColor,
            }}
          >
            Photo Size
          </p>
          <input
            type="range"
            min={10}
            max={34}
            onChange={(e) => sizeHandler(e.target.value)}
            style={{ background: "#2e7d32" }}
            value={props.size}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="toolbarButtonsHolder">
        <div className="toolbarButton">
          <Button
            style={{
              color: props.dark ? props.lightColor : props.darkColor,
              boxShadow: "2px 2px 2px #eeeeee",
            }}
            onClick={() => pagehandler()}
          >
            <p>{props.newEntry ? "Archive" : "New Entry"}</p>
          </Button>
        </div>
      </div>
      {props.newEntry ? (
        <></>
      ) : (
        <div className="inputHolder">
          <TextField
            placeholder="Search"
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            sx={{
              color: "white",
              backgroundColor: "white",
              borderRadius: "5%",
            }}
          />
          <div className="selectionButtonsHolder">
            <ToggleButtonGroup
              value={props.searchOps}
              onChange={pressHandler}
              aria-label="text formatting"
              color="success"
            >
              {textElements.map((element) => {
                return (
                  <ToggleButton value={element.name} onClick={pressHandler}>
                    {element.logo}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </div>
        </div>
      )}
    </div>
  );
}
