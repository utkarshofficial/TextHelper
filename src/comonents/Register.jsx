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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

function Register() {
  const [hideText, setHideText] = React.useState("false");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authError, setAuthError] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // for savgin user to authcontext
  // dispatch is destructured
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const showPasswordText = () => {
    if (hideText) {
      setHideText(false);
    } else {
      setHideText(true);
    }
  };

  // for adding new user
  const handleSignup = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
  const DontShowSignUpAfterAuth = ({ children }) => {
    return User !== null ? <Navigate to="/" /> : children;
  };

  return (
    <DontShowSignUpAfterAuth>
      <form onSubmit={handleSignup}>
        <div className="signup-box">
          <div className="signup-icon">
            <LockOpenIcon />
          </div>
          <h2>Sign up</h2>
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

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="confirm-password-label">Password</InputLabel>
            <OutlinedInput
              id="confirm-password-label"
              type={hideText ? "password" : "text"}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              error={password !== confirmPassword}
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
              user is already registered !
            </span>
          ) : null}
          <Button
            disabled={
              password !== confirmPassword || password === "" || email === ""
            }
            type="submit"
            variant="contained"
          >
            Sign up
          </Button>
        </div>
      </form>
    </DontShowSignUpAfterAuth>
  );
}

export default Register;
