import React from "react";
import "./DataList.scss";
import Data from "./Data";
import { LinearProgress,Box } from "@mui/material";

function DataList({ dataList,removeDataItem, showToast}) {
  const showData = dataList.map((data, i) => {
    return (
      <Data
        data={data}
        key={i}
        index={i}
        removeDataItem={removeDataItem}
        showToast={showToast}
      />
    );
  });


  return (
    <div className="card">
      <h5 className="card-header">Clipboard Data</h5>
      <Box hidden={dataList.length === 0 ? false : true} sx={{ width: "100%" }}>
        <LinearProgress color="secondary"/>
      </Box>
      <ul className="list-group list-group-flush fw-bold">{showData}</ul>
    </div>
  );
}

export default DataList;
