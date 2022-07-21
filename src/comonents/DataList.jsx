import React from "react";
import "./DataList.scss";
import Data from "./Data";

function DataList( {dataList,removeDataItem,copyDataItem}) {
  

  const showData = dataList.map((data, i) => {
    return (
      <Data data={data} key={i} index={i} removeDataItem={removeDataItem}
      />
    );
  });

  return (
    <div className="card" style={{ width: "80%" }}>
      <h5 className="card-header">Clipboard Data</h5>
      <ul className="list-group list-group-flush">{showData}</ul>
    </div>
  );
}

export default DataList;
