import React from "react";
import "./Register.scss";
import {
  TextField,
  Button,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from '@mui/icons-material/Email';

function Register() {
  const [hideText, setHideText] = React.useState("false");
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [confirmPassword,setConfirmPassword] = React.useState("");

  

  const showPasswordText = () => {
    if (hideText) {
      setHideText(false);
    } else {
      setHideText(true);
    }
  };

  return (
    <div className="signup-box">
      <div className="signup-icon">
        <LockOpenIcon />
      </div>
      <TextField
        className="m-1 setwidth"
        label="Email"
        type="email"
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        autoComplete="current-password"
        InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment>,
          }}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="password-label">Password</InputLabel>
        <OutlinedInput
          id="password-label"
          type={hideText ? "password" : "text"}
          onChange={(e)=>{
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
          onChange={(e)=>{
            setConfirmPassword(e.target.value);
          }}
          error={password!==confirmPassword}
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
      <Button disabled={password!==confirmPassword || password==="" || email===""} variant="contained">Sign up</Button>
    </div>
  );
}

export default Register;
