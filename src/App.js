import React from 'react'
import DataList from "./comonents/DataList";
import Paste from "./comonents/Paste";

function App() {
  const ClipboardData = [
    "1. Hello how are you",
    "2. item is the powerfull",
    "3. item is the powerfull",
    "4. why is the playground window is stick around here",
    "5. item is the powerfull",
    "6. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, est."
  ];

  let [dataList, setDataList] = React.useState(ClipboardData);

  const removeDataItem = (index) => {
    let newDataList = [...dataList];
    newDataList.splice(index,1);
    setDataList(newDataList);
  };

  const pasteDataItem = ()=>{
    let newDataList = [...dataList];
    navigator.clipboard.readText().then((text)=>{
      newDataList.unshift(text);
      setDataList(newDataList);
    });
    console.log(dataList);
  }

  return (
    <div className="box">
      <Paste pasteDataItem={pasteDataItem}/>
      <DataList
        dataList={dataList}
        removeDataItem={removeDataItem}
      />
    </div>
  );
}

export default App;
