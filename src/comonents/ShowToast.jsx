import React from "react";
import { Button, Slide, Alert, Snackbar } from "@mui/material";

function ShowToast({undo, hideToast, severity, message}) {
  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  // undo button
  var undone;

  if (severity === "success") {
    undone = null;
  } else if (severity === "error") {
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
