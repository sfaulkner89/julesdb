import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Toolbar from "./components/toolbar";
import EntryPage from "./components/entrypage";
import ArchivePage from "./components/archivepage";

const darkColor = "#34333a";
const lightColor = "white";

const userSize = window.localStorage.getItem("picSize") || 20;
const darkMode = window.localStorage.getItem("darkMode") || false;

function App() {
  const [newEntry, setNewEntry] = useState(false);
  const [size, setSize] = useState(userSize);
  const [dark, setDark] = useState(darkMode);
  const [status, setStatus] = useState("Starting Up...");
  const [searchOps, setSearchOps] = useState(["Designer"]);
  const [search, setSearch] = useState("");

  const pagebody = [
    <EntryPage
      dark={dark}
      darkColor={darkColor}
      lightColor={lightColor}
      status={setStatus}
      setNewEntry={setNewEntry}
    />,
    <ArchivePage
      size={size}
      dark={dark}
      darkColor={darkColor}
      lightColor={lightColor}
      searchOps={searchOps}
      search={search}
    />,
  ];
  return (
    <div
      className="App"
      style={{ backgroundColor: dark ? darkColor : lightColor }}
    >
      <div className="toolbarDiv">
        <Toolbar
          page={() => setNewEntry(!newEntry)}
          setSize={setSize}
          size={size}
          setDark={setDark}
          dark={dark}
          darkColor={darkColor}
          lightColor={lightColor}
          searchOps={searchOps}
          setSearchOps={setSearchOps}
          setSearch={setSearch}
          newEntry={newEntry}
        />
      </div>
      <div className="bodyHolderDiv">
        {newEntry ? pagebody[0] : pagebody[1]}
      </div>
    </div>
  );
}

export default App;
