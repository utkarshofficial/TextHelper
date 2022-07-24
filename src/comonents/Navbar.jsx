import React from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Avatar,Box,LinearProgress} from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "react-bootstrap/Button";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link ,useLocation} from "react-router-dom";



function NavbarComponent({ currentUser,clearDataList }) {
  // * Show Progressbar when ever user changes
  const [hideProgress,setHideProgress] = React.useState(true);
  const location = useLocation();
  // whenever user location change is fired
  React.useEffect(()=>{
    setHideProgress(false);
    setTimeout(()=>{
      setHideProgress(true);
    },500)
  },[location,currentUser]);
  // for arrow of dropdown menu
  const [Arrow, setArrow] = React.useState(true);
  const [showSidebar,setShowSidebar] = React.useState(false);

  // * getting logged user details for first time. for changing arrow of dropdown menu
  const toggleArrow = () => {
    {
      Arrow ? setArrow(false) : setArrow(true);
    }
    {showSidebar ? setShowSidebar(false) : setShowSidebar(true)};
  };

  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const SignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      clearDataList();
      dispatch({ type: "LOGOUT" });
      navigate("/");
    });
    toggleArrow();
  };

  // if user logged in
  const ShowLoggedInAvatar = () => {
    let firstName = currentUser.displayName;
    var fname = firstName.slice(0, firstName.indexOf(" "));
    return (
      <React.Fragment>
        <span className="user-name">{fname}</span>
        <Avatar className="avatar" sx={{ bgcolor: "orange" }}>
          {fname[0]}
        </Avatar>
      </React.Fragment>
    );
  };

  const ShowLoggedInNav = () => {
    return (
      <Nav className="me-auto">
        <span className="fullname">{currentUser.displayName}</span>
        <span className="fullname">
          <EmailIcon className="nav-icons" />
          {currentUser.email}
        </span>
        <hr className="divider" />
        <Link to="/" className="nav-link" onClick={toggleArrow}>
          <HomeIcon className="nav-icons" />
          Home
        </Link>
        <Nav.Link target="_blank" href="https://instagram.com/utkarshencoder"  onClick={toggleArrow}>
          <SupervisedUserCircleIcon className="nav-icons" />
          Contact Us
        </Nav.Link>
        <hr className="divider" />
        <Nav.Link className="fullname" onClick={SignOut}>
          <LogoutIcon className="nav-icons" />
          Sign Out
        </Nav.Link>
        <Button variant="dark">
          <NavDropdown
            title={
              currentUser !== null ? (
                <ShowLoggedInAvatar />
              ) : (
                <ShowLoggedOutAvatar />
              )
            }
            className="show-pc"
            id={"offcanvasNavbarDropdown-expand-lg"}
          >
            <NavDropdown.Item>{currentUser.displayName}</NavDropdown.Item>
            <NavDropdown.Item>{currentUser.email}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={SignOut}>
              <LogoutIcon className="" />
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </Button>
      </Nav>
    );
  };

  const ShowLoggedOutNav = () => {
    return (
      <Nav className="justify-content-end flex-grow-1 pe-3">
        <Link to="/" className="nav-link" onClick={toggleArrow}>
          <HomeIcon className="nav-icons" />
          Home
        </Link>
        <Nav.Link target="_blank" href="https://instagram.com/utkarshencoder" onClick={toggleArrow}>
          <SupervisedUserCircleIcon className="nav-icons" />
          Contact Us
        </Nav.Link>
        <hr className="divider" />
        <Link to="/signup" className="nav-link" onClick={toggleArrow}>
          <AddCircleIcon className="nav-icons" />
          Sign up
        </Link>
        <Link to="/login" className="nav-link" onClick={toggleArrow}>
          <LoginIcon className="nav-icons" />
          Sign in
        </Link>
      </Nav>
    );
  };

  const ShowLoggedOutAvatar = () => {
    return (
      <React.Fragment>
        <span className="user-name">Sign in</span>
        <AccountCircleIcon className="account-icon" />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Navbar
        sticky="top"
        bg="dark"
        variant="dark"
        expand="lg"
        className=""
      >
        <Container fluid>
          <Navbar.Brand>
            <Link to="/" className="nav-link">
              <ContentCopyRoundedIcon className="nav-icon" />
              Text Helper
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle>
            <div
              onClick={toggleArrow}
              aria-controls="basic-navbar-nav"
              className="nav-toggle"
            >
              {currentUser !== null ? (
                <ShowLoggedInAvatar />
              ) : (
                <ShowLoggedOutAvatar />
              )}
              {Arrow ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </div>
          </Navbar.Toggle>
          <Navbar.Offcanvas
            show={showSidebar ? "true" : undefined}
            onHide={toggleArrow}
            className="offcanvas"
            id={"offcanvasNavbar-expand-lg"}
            aria-labelledby={"offcanvasNavbarLabel-expand-lg"}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={"offcanvasNavbarLabel-expand-lg"}>
                <ContentCopyRoundedIcon className="nav-icon" />
                Text Helper
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {currentUser !== null ? (
                <ShowLoggedInNav />
              ) : (
                <ShowLoggedOutNav />
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Box sx={{ width: "100%" }} className="progress-bar-box">
        <LinearProgress hidden={hideProgress} color="secondary"/>
      </Box>
    </React.Fragment>
  );
}

export default NavbarComponent;
