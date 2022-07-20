import React from "react";
import "./DataList.scss";
import Data from "./Data";

function DataList() {
  const dataList = [
    "1. Hello how are you",
    "2. item is the powerfull",
    "3. item is the powerfull",
    "4. why is the playground window is stick around here",
    "5. item is the powerfull",
    "6. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, est.",
  ];

  const [DataList, setDataList] = React.useState(dataList);

  const removeDataItem = (index) => {
    setDataList(DataList.splice(index, 1));
  };

  const showData = dataList.map((data, i) => {
    return (
      <Data data={data} key={i} index={i} removeDataItem={removeDataItem} />
    );
  });

  return (
    <div className="card" style={{ width: "80%" }}>
      <h5 class="card-header">Clipboard Data</h5>
      <ul className="list-group list-group-flush">{showData}</ul>
    </div>
  );
}

export default DataList;
