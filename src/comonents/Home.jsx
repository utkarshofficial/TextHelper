import React from "react";
import "./Home.scss";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import ComputerIcon from "@mui/icons-material/Computer";
import SyncIcon from "@mui/icons-material/Sync";
import {Button} from "@mui/material"
import {useNavigate} from "react-router-dom"
function Home() {
  const Footer = () => {
    return (
      <footer className="app-footer">
        <div>
          <p>
            Developed by <span>Utkarsh Sharma</span>
          </p>
          <div>
            <a rel="noreferrer" href="https://github.com/utkarshofficial">GitHub</a>
            <a rel="noreferrer" href="https://instagram.com/utkarshencoder">Instagram</a>
            <a rel="noreferrer" href="https://www.linkedin.com/in/-utkarsh-sharma/">LinkedIn</a>
          </div>
        </div>
      </footer>
    );
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="home-container">
        <div className="home-item-container">
          <h1 className="title-text">
            SAVE Your
            <br />
            <span>Links</span>, <span>Text</span> and access it from Any Device.
          </h1>
          <p>
            Save your text and links with your phone
            <br />
            <PhoneAndroidIcon className="device-icon" />
            <SyncIcon className="sync-icon" />
            <ComputerIcon className="device-icon" />
            <SyncIcon className="sync-icon" />
            <DesktopWindowsIcon className="device-icon" />
            <br />
            And use it from any device.
          </p>
          <p className="title-logo">
            <ContentCopyRoundedIcon className="nav-logo" />
            Text Helper
          </p>
          <ul className="detail-list">
            <div>
              <p>
                <AutoAwesomeIcon />
                Provided Features
              </p>
              <Button onClick={()=>{
                navigate("/signup")
              }} variant='contained'>Sign up</Button>
            </div>
            <li>Sync</li>
            <li>Save</li>
            <li>Copy</li>
            <li>Delete</li>
          </ul>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
