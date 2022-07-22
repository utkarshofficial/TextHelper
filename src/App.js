import React from "react";
import DataList from "./comonents/DataList";
import Paste from "./comonents/Paste";
import ShowToast from "./comonents/ShowToast";
import { getDatabase, ref, push, set } from "firebase/database";
import "./firebase";

function App() {
  // firebase codes
  const addDataFire = (newDataList) => {
    setDataList(newDataList);
    const db = getDatabase();
    set(ref(db, "paste-data"), {
      data: [...newDataList]
    });
  };

  const ClipboardData = [
    "1. Hello how are you",
    "2. item is the powerfull",
    "3. item is the powerfull",
    "4. why is the playground window is stick around here",
    "5. item is the powerfull",
    "6. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, est.",
    "1. Hello how are you",
    "2. item is the powerfull",
    "3. item is the powerfull",
    "4. why is the playground window is stick around here",
    "5. item is the powerfull",
    "6. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, est.",
  ];

  const [dataList, setDataList] = React.useState(ClipboardData);

  // for toast message copy or deleted
  const [severity, setSeverity] = React.useState("success");

  // copy the data to clipboard and show toast
  const [copied, setCopied] = React.useState(false);

  // saved removed data for undo it
  const [undoData, setUndoData] = React.useState("");

  const removeDataItem = (index) => {
    let newDataList = [...dataList];
    setUndoData(newDataList.splice(index, 1).toString());
    addDataFire(newDataList);
    setSeverity("error");
    showToast();
  };

  const undo = () => {
    let newDataList = [...dataList];
    newDataList.unshift(undoData);
    addDataFire(newDataList);
    hideToast();
  };

  const pasteDataItem = (pasteItem) => {
    let newDataList = [...dataList];

    // pasted manually
    if (!navigator.clipboard && pasteItem !== "") {
      let availIndex = newDataList.indexOf(pasteItem);
      if (availIndex !== -1) {
        let availableData = newDataList.splice(availIndex, 1).toString();
        newDataList.unshift(availableData);
        addDataFire(newDataList);
        return;
      }
      // if not available then simply add it
      newDataList.unshift(pasteItem);
      addDataFire(newDataList);
    } else {
      // paste by button
      navigator.clipboard.readText().then((text) => {
        // checking that if data already available
        // then don't add just remove and add again
        let availIndex = newDataList.indexOf(text);
        if (availIndex !== -1) {
          let availableData = newDataList.splice(availIndex, 1).toString();
          newDataList.unshift(availableData);
          addDataFire(newDataList);
          return;
        }
        // if not available then simply add it
        newDataList.unshift(text);
        addDataFire(newDataList);
      });
    }
  };

  const showToast = () => {
    setCopied(true);
  };

  const hideToast = () => {
    setSeverity("success");
    setCopied(false);
  };

  return (
    <div className="box">
      <Paste pasteDataItem={pasteDataItem} />
      <DataList
        dataList={dataList}
        removeDataItem={removeDataItem}
        showToast={showToast}
      />
      {copied ? (
        <ShowToast severity={severity} hideToast={hideToast} undo={undo} />
      ) : null}
    </div>
  );
}

export default App;
