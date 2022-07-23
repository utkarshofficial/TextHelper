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

function Login() {
  const [hideText, setHideText] = React.useState("false");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authError, setAuthError] = React.useState(false);
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
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setAuthError(true);
      });
  };

  // * Not showing login component after logged in
  // * if user logged in and pressed back then they
  // * doesn't see login page
  const { currentUser } = React.useContext(AuthContext);
  const User = currentUser;
  // children means home page, what is showing after login
  // wrap all the pages that you don't want to show before login
  const DontShowLoginAfterAuth = ({ children }) => {
    return User !== null ? <Navigate to="/" /> : { children };
  };

  return (
    <DontShowLoginAfterAuth>
      <form onSubmit={handleLogin}>
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
            Log in
          </Button>
        </div>
      </form>
    </DontShowLoginAfterAuth>
  );
}

export default Login;
