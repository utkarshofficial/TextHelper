import React from "react";
import {FormControl, Button, OutlinedInput, InputAdornment,InputLabel} from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import "./Paste.scss";
function Paste({ pasteDataItem, pasteMode }) {
  const [pasteData, setPasteData] = React.useState("");
  // handle paste
  const handlePasteButton = () => {
    navigator.clipboard.readText().then((text) => {
      pasteDataItem(text);
    });
  };

  // paste button for pc
  const PasteByButton = (
    <div className="text-input input-btn">
      <Button
        type="button"
        color="secondary"
        variant="contained"
        className="paste-btn btn btn-outline-primary"
        onClick={handlePasteButton}
      >
        <h2>Paste Link/Text</h2>
      </Button>
    </div>
  );

  const Submit = (event) => {
    event.preventDefault();
    pasteDataItem(pasteData);
  };

  // paste manually by ctrl + c
  const PasteManually = (
    <form className="text-input paste-manual" onSubmit={Submit}>
      <FormControl focused fullWidth variant="outlined">
      <InputLabel  className="pasteInput-label" htmlFor="search-label">Paste data here</InputLabel>
      <OutlinedInput
        placeholder="Text / Link"
        id="search-label"
        type="search"
        className="data-input"
        label="Paste data here"
        startAdornment={
          <InputAdornment position="start">
            <ContentPasteIcon className="textInputCopy-icon"/>
          </InputAdornment>
          }
        color="secondary"
        onChange={(e) => {
          setPasteData(e.target.value);
        }}
      />
      </FormControl>
      <Button
        color="secondary"
        className="manual-btn"
        onClick={() => {
          pasteDataItem(pasteData);
        }}
        variant="contained"
      >
        Add
      </Button>
    </form>
  );

  return (
    <div className="paste-box">
      {pasteMode === "button" && navigator.clipboard
        ? PasteByButton
        : PasteManually}
    </div>
  );
}

export default Paste;
