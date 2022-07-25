import React from "react";
import "./DataList.scss";
import Data from "./Data";
import { LinearProgress, Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function DataList({ dataList, removeDataItem, showToast,pasteMode,changePasteMode }) {
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
      <h5 className="card-header">
        Clipboard Data
        <ToggleButtonGroup
          color="secondary"
          value={pasteMode}
          exclusive
          onChange={changePasteMode}
        >
          <ToggleButton value="input">Input</ToggleButton>
          <ToggleButton value="button">Button</ToggleButton>
        </ToggleButtonGroup>
      </h5>
      <Box hidden={dataList.length === 0 ? false : true} sx={{ width: "100%" }}>
        <LinearProgress color="secondary" />
      </Box>
      <ul className="list-group list-group-flush fw-bold">{showData}</ul>
    </div>
  );
}

export default DataList;
