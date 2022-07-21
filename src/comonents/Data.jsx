import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Data({ data, removeDataItem, index}) {
  const [copied,setCopied] = React.useState(false);
  
  return (
    <li className="list-group-item textAndBtn">
      <div className="text-item">{data}</div>

      <div className="group-btns">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              removeDataItem(index);
            }}
          >
            Delete
          </button>
          <CopyToClipboard text={data} onCopy={()=>{setCopied(true)}}>
            <button type="button" className="btn btn-success">
              Copy
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </li>
  );
}

export default Data;
