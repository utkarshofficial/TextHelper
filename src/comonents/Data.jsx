import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button,ButtonGroup } from "@mui/material";

function Data({ data, removeDataItem, index, showToast }) {
  const DeleteBtn = (
    <Button
      onClick={() => {
        removeDataItem(index);
      }}
    >
      <DeleteOutlineIcon color="error"/>
    </Button>
  );

  const CopyBtn = (
    <CopyToClipboard text={data} onCopy={showToast}>
      <Button
        onClick={() => {
          showToast();
        }}
      >
        <ContentCopyIcon color="success" />
      </Button>
    </CopyToClipboard>
  );

  return (
    <li className="list-group-item textAndBtn">
      <div className="text-item">{data}</div>

      <ButtonGroup variant="text" aria-label="text button group">
          {CopyBtn}
          {DeleteBtn}
      </ButtonGroup>
    </li>
  );
}

export default Data;
