import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, ButtonGroup, Link } from "@mui/material";
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
    <CopyToClipboard text={data}>
      <Button
        onClick={() => {
          showToast("Item Copied Successfully!", "success");
        }}
      >
        <ContentCopyIcon color="success" />
      </Button>
    </CopyToClipboard>
  );

  // * for showing limited data on bigger text
  // * Setting limit of character in data
  const MAX = 100;
  const [limitedData, setLimitedData] = React.useState(data.slice(0,MAX));
  const [currentLimit, setCurrentLimit] = React.useState(MAX);
  const [showLess,setShowLess] = React.useState(false);

  const readMore = () => {
    setCurrentLimit(currentLimit + MAX);
    setLimitedData(data.slice(0, currentLimit));
    if(!showLess){
      setShowLess(true);
    }
  };
  const readLess = ()=>{
    setLimitedData(data.slice(0,MAX));
    setCurrentLimit(MAX);
    setShowLess(false);
  }

  // * Link Filtering
  let dataFirst = limitedData;
  if (data.includes("http://") || data.includes("https://")) {
    dataFirst = (
      <Link target="_blank"href={data} underline="hover">
        {limitedData}
      </Link>
    );
  }else if(data.includes("://")){
    dataFirst = (
      <span className="text-primary fw-bold">
        {limitedData}
      </span>
    );
  }
  return (
    <li className="list-group-item textAndBtn">
      <div className="text-item">
        {dataFirst}
        {/* Calling readmore if limit breaks */}
        {(data.length > currentLimit) ? <span onClick={readMore}>...more</span> : null}
        {/* Calling show less after biger text */}
        {showLess ? <span onClick={readLess}> ...less</span> : null}
      </div>

      <ButtonGroup variant="text" aria-label="text button group">
        {CopyBtn}
        {DeleteBtn}
      </ButtonGroup>
    </li>
  );
}

export default Data;
