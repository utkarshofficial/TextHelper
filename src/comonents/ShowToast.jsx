import React from "react";
import { Button, Slide, Alert, Snackbar } from "@mui/material";

function ShowToast({undo, hideToast, severity }) {
  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  // undo button
  var message,undone;

  if (severity === "success") {
    message = "Item Copied Successfully!";
    undone = null;
  } else {
    message = "Item is deleted!";
    undone = (
      <Button color="secondary" size="small" onClick={undo}>
        UNDO
      </Button>
    );
  }

  return (
    <Snackbar
      open={true}
      autoHideDuration={2000}
      TransitionComponent={TransitionUp}
      onClose={hideToast}
    >
      <Alert
        variant="filled"
        onClose={hideToast}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
        {undone}
      </Alert>
    </Snackbar>
  );
}

export default ShowToast;
