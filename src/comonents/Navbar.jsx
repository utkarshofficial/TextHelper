import React from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Avatar } from "@mui/material";
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

function OffcanvasExample() {
  const [Arrow, setArrow] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [fullname,setFullname] = React.useState("");
  const [email,setEmail] = React.useState("");

  const toggleArrow = () => {
    {
      Arrow ? setArrow(false) : setArrow(true);
    }
  };

  const ShowLoggedOutAvatar = () => {
    return (
      <React.Fragment>
        <span className="user-name">Sign in</span>
        <AccountCircleIcon className="account-icon" />
      </React.Fragment>
    );
  };

  // if user logged in
  const ShowLoggedInAvatar = () => {
    return (
      <React.Fragment>
        <span className="user-name">Naresh</span>
        <Avatar className="avatar" sx={{ bgcolor: "orange" }}>
          N
        </Avatar>
      </React.Fragment>
    );
  };

  const ShowLoggedInNav = () => {
    return (
      <Nav className="me-auto">
        <span className="fullname">Naresh Tiwari</span>
        <span className="fullname">
          <EmailIcon className="nav-icons" />
          nareshtiwari@gmail.com
        </span>
        <hr className="divider" />
        <Nav.Link href="/">
          <HomeIcon className="nav-icons" />
          Home
        </Nav.Link>
        <Nav.Link target="_blank" href="https://instagram.com/utkarshencoder">
          <SupervisedUserCircleIcon className="nav-icons" />
          Contact Us
        </Nav.Link>
        <hr className="divider" />
        <Nav.Link href="/" className="fullname">
          <LogoutIcon className="nav-icons"/>
          Sign Out
        </Nav.Link>
        <Button variant="dark">
          <NavDropdown
            title={loggedIn ? <ShowLoggedInAvatar /> : <ShowLoggedOutAvatar />}
            className="show-pc"
            id={"offcanvasNavbarDropdown-expand-lg"}
          >
            <NavDropdown.Item>Naresh Tiwari</NavDropdown.Item>
            <NavDropdown.Item>nareshtiwari@gmail.com</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
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
        <Nav.Link href="/">
          <HomeIcon className="nav-icons" />
          Home
        </Nav.Link>
        <Nav.Link target="_blank" href="https://instagram.com/utkarshencoder">
          <SupervisedUserCircleIcon className="nav-icons" />
          Contact Us
        </Nav.Link>
        <hr className="divider" />
        <Nav.Link href="/login">
          <LoginIcon className="nav-icons" />
          Sign in
        </Nav.Link>
        <Nav.Link href="/signup">
          <AddCircleIcon className="nav-icons" />
          Sign up
        </Nav.Link>
      </Nav>
    );
  };

  return (
    <>
      <Navbar
        sticky="top"
        bg="dark"
        variant="dark"
        expand="lg"
        className="mb-3"
      >
        <Container fluid>
          <Navbar.Brand href="#home">
            <ContentCopyRoundedIcon className="nav-icon" />
            Text Helper
          </Navbar.Brand>
          <Navbar.Toggle>
            <div
              onClick={toggleArrow}
              aria-controls="basic-navbar-nav"
              className="nav-toggle"
            >
              {loggedIn ? <ShowLoggedInAvatar /> : <ShowLoggedOutAvatar />}
              {Arrow ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </div>
          </Navbar.Toggle>
          <Navbar.Offcanvas
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
              {loggedIn ? <ShowLoggedInNav /> : <ShowLoggedOutNav />}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;
