import React from "react";

function Paste({pasteDataItem}) {

  return (
    <div className="paste-box">
      <button type="button" className="paste-btn btn btn-outline-primary" onClick={()=>{pasteDataItem()}}>
        <h1>Paste</h1>
      </button>
    </div>
  );
}

export default Paste;
