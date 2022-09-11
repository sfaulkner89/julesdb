import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Toolbar from "./components/toolbar";
import EntryPage from "./components/entrypage";
import ArchivePage from "./components/archivepage";

const darkColor = "#34333a";
const lightColor = "white";

function App() {
  const [newEntry, setNewEntry] = useState(false);
  const [size, setSize] = useState(40);
  const [dark, setDark] = useState(false);
  const [status, setStatus] = useState("Starting Up...");
  const [searchOps, setSearchOps] = useState(["Designer"]);
  const [search, setSearch] = useState("");

  const pagebody = [
    <EntryPage
      dark={dark}
      darkColor={darkColor}
      lightColor={lightColor}
      status={setStatus}
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
          size={setSize}
          setDark={() => setDark(!dark)}
          dark={dark}
          darkColor={darkColor}
          lightColor={lightColor}
          searchOps={searchOps}
          setSearchOps={setSearchOps}
          setSearch={setSearch}
        />
      </div>
      <div className="bodyHolderDiv">
        {newEntry ? pagebody[0] : pagebody[1]}
      </div>
    </div>
  );
}

export default App;
