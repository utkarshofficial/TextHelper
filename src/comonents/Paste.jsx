import React from "react";
import { Button, TextField, InputAdornment } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import "./Paste.scss";

function Paste({ pasteDataItem }) {

  const [pasteData,setPasteData] = React.useState('');
  
  // paste button for pc
  const PasteByButton = (
    <button
      type="button"
      className="paste-btn btn btn-outline-primary"
      onClick={() => {
        pasteDataItem();
      }}
    >
      <h1>Paste</h1>
    </button>
  );

  const Submit = (event)=>{
    event.preventDefault();
    pasteDataItem(pasteData);
  }

  // paste manually by ctrl + c
  const PasteManually = (
    <form className="footer paste-manual" onSubmit={Submit}>
      <TextField
        fullWidth
        type='search'
        className="data-input"
        label="Paste data here"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ContentPasteIcon />
            </InputAdornment>
          ),
        }}
        color="secondary"
        focused
        onChange={(e)=>{
          setPasteData(e.target.value);
        }}
      />
      <Button color="primary" className="manual-btn" onClick={()=>{
        pasteDataItem(pasteData)
      }} variant="contained">
        Add
      </Button>
    </form>
  );

  return (
    <div className="paste-box">
      {navigator.clipboard ? PasteByButton : PasteManually}
    </div>
  );
}

export default Paste;
