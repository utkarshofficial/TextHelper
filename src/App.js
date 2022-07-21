import React from "react";
import DataList from "./comonents/DataList";
import Paste from "./comonents/Paste";
import ShowToast from "./comonents/ShowToast";

function App() {
  const ClipboardData = [
    "1. Hello how are you",
    "2. item is the powerfull",
    "3. item is the powerfull",
    "4. why is the playground window is stick around here",
    "5. item is the powerfull",
    "6. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, est.",
  ];

  const [dataList, setDataList] = React.useState(ClipboardData);

  // for toast message copy or deleted
  const [severity,setSeverity] = React.useState("success");

  // copy the data to clipboard and show toast
  const [copied, setCopied] = React.useState(false);

  // saved removed data for undo it
  const [undoData,setUndoData] = React.useState("");

  const removeDataItem = (index) => {
    let newDataList = [...dataList];
    setUndoData(newDataList.splice(index, 1));
    setDataList(newDataList);
    setSeverity("warning");
    showToast();
  };

  const undo = () =>{
    let newDataList = [...dataList];
    newDataList.unshift(undoData);
    setDataList(newDataList);
    hideToast();
  }

  const pasteDataItem = () => {
    let newDataList = [...dataList];
    navigator.clipboard.readText().then((text) => {
      newDataList.unshift(text);
      setDataList(newDataList);
    });
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
      {copied ? <ShowToast severity={severity} hideToast={hideToast} undo={undo} />:null}
    </div>
  );
}

export default App;
