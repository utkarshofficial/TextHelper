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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import ShowToast from "./ShowToast";
import { db } from "../firebase";
import Navbar from "./Navbar";

function Register() {
  const [hideText, setHideText] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authError, setAuthError] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);

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

  

  // for adding new user and storing data on firestore
  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    var user = null;
    // res - response
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      user = res.user;
      await updateProfile(res.user, {
        displayName: fullName,
      })
      await setDoc(doc(db, "users", res.user.uid), {
        fullname: fullName,
        email: email,
        password: password,
        timeStamp: serverTimestamp(),
      });
      setShowToast(true);
      dispatch({ type: "LOGIN", payload: res.user });
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (err) {
      setAuthError(true);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSignup}>
        <div className="signup-box">
          <div className="signup-icon">
            <LockOpenIcon />
          </div>
          <h2>Sign up</h2>
          {showToast ? (
            <ShowToast
              severity={"success"}
              message={"User Created Successfully !"}
              hideToast={null}
            />
          ) : null}
          <FormControl sx={{ m: 1, width: "25.8ch" }} variant="outlined">
            <TextField
              className="m-1 setwidth"
              label="Full Name"
              type="text"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25.8ch" }} variant="outlined">
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
          </FormControl>
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
            <InputLabel htmlFor="confirm-password-label">
              Confirm Password
            </InputLabel>
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
              label="Confirm Password"
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
    </React.Fragment>
  );
}

export default Register;
