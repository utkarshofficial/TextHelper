import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Button,
  ButtonGroup,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import "./Data.scss";

function Data({ data, removeDataItem, index, showToast }) {
  const DeleteBtn = (
    <Button
      onClick={() => {
        removeDataItem(index);
      }}
    >
      <DeleteOutlineIcon color="error" />
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

  //array for showing all the data
  var dataFirst, dataSecond;

  // to set limited char on data
  // 100 char is seted
  var newData = data;
  dataFirst = newData;
  let maxLimit = 100;
  if (newData.length > maxLimit) {
    newData = newData.slice(0, maxLimit) + "... ";
    dataFirst = newData;
  }

  const readMore = () => {
    newData = data;
    maxLimit += maxLimit;
    if (newData.length > maxLimit) {
      newData = newData.slice(0, maxLimit) + "... ";
    } else {
      newData = data;
    }
    dataFirst = newData;
  };
  dataSecond =
    newData.length > maxLimit ? <span onClick={readMore}>more</span> : null;

  // link filttering
  if (data.includes("http://") || data.includes("https://")) {
    dataFirst = (
      <Link href={data} underline="hover">
        {data}
      </Link>
    );
  }

  return (
    <li className="list-group-item textAndBtn">
      <div className="text-item">
        {dataFirst}
        {dataSecond}
      </div>

      <ButtonGroup variant="text" aria-label="text button group">
        {CopyBtn}
        {DeleteBtn}
      </ButtonGroup>
    </li>
  );
}

export default Data;
