import React from "react";
import "./Register.scss";
import {
  TextField,
  Button,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [hideText, setHideText] = React.useState("false");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const showPasswordText = () => {
    if (hideText) {
      setHideText(false);
    } else {
      setHideText(true);
    }
  };

  // for login existing user
  const UserLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="signup-box">
      <div className="signup-icon">
        <LockOutlinedIcon />
      </div>
      <h2>Log in</h2>
      <TextField
        className="m-1 setwidth"
        label="Email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        autoComplete="current-password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="password-label">Password</InputLabel>
        <OutlinedInput
          id="password-label"
          type={hideText ? "password" : "text"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={showPasswordText}
                edge="end"
              >
                {hideText ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Button
        disabled={
          email === "" ||
          password === "" ||
          email.lastIndexOf("@") === -1 ||
          email.lastIndexOf(".") === -1 ||
          email.lastIndexOf("@") > email.lastIndexOf(".")
        }
        variant="contained"
        onClick={UserLogin}
      >
        Log in
      </Button>
    </div>
  );
}

export default Login;
