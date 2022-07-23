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
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import ShowToast from "./ShowToast";
import Navbar from "./Navbar"

function Login() {
  const [hideText, setHideText] = React.useState("false");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authError, setAuthError] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  // dispatch is used to login
  const { dispatch } = React.useContext(AuthContext);
  // navigate is used to navigate user to home page after login
  const navigate = useNavigate();

  const showPasswordText = () => {
    if (hideText) {
      setHideText(false);
    } else {
      setHideText(true);
    }
  };

  // for login existing user
  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setShowToast(true);
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setTimeout(() => {
          navigate("/main");
        }, 2000);
      })
      .catch((error) => {
        setAuthError(true);
      });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleLogin} style={{marginTop: "80px"}}>
        <div className="signup-box">
          <div className="signup-icon">
            <LockOutlinedIcon />
          </div>
          <h2>Sign in</h2>
          {showToast ? (
            <ShowToast
              severity={"success"}
              message={"User Logged in Successfully !"}
              hideToast={null}
            />
          ) : null}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              label="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              // for showing the red border
              error={authError}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="password-label">Password</InputLabel>
            <OutlinedInput
              id="password-label"
              type={hideText ? "password" : "text"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              // for showing the red border
              error={authError}
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

          {authError ? (
            <span className="p-1 badge mb-2 text-bg-danger">
              email or passowrd is wrong !
            </span>
          ) : null}
          <Button
            type="submit"
            className="mt-1"
            disabled={
              email === "" ||
              password === "" ||
              email.lastIndexOf("@") === -1 ||
              email.lastIndexOf(".") === -1 ||
              email.lastIndexOf("@") > email.lastIndexOf(".")
            }
            variant="contained"
          >
            Sign in
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Login;
