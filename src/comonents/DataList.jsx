import React from "react";
import "./DataList.scss";
import Data from "./Data";

function DataList( {dataList,removeDataItem,showToast}) {
  

  const showData = dataList.map((data, i) => {
    return (
      <Data data={data} key={i} index={i} removeDataItem={removeDataItem} showToast={showToast}
      />
    );
  });

  return (
    <div className="card">
      <h5 className="card-header">Clipboard Data</h5>
      <ul className="list-group list-group-flush fw-bold">{showData}</ul>
    </div>
  );
}

export default DataList;
