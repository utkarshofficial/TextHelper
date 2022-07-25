import React, { useContext } from "react";
import DataList from "./comonents/DataList";
import Paste from "./comonents/Paste";
import ShowToast from "./comonents/ShowToast";
import Register from "./comonents/Register";
import Login from "./comonents/Login";
import Home from "./comonents/Home";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "./firebase";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./comonents/Navbar";

function App() {
  // * getting current user
  const { currentUser } = React.useContext(AuthContext);
  const User = currentUser;
  // firebase functions
  // * for adding the dataarray to the firebase db
  const addDataFire = (newDataList) => {
    // for removing the example data
    if (newDataList.indexOf("example") !== -1 && newDataList.length > 1) {
      newDataList.splice(newDataList.indexOf("example"), 1);
    }
    setDataList(newDataList);
    const db = getDatabase();
    set(ref(db, `paste-data/${User.uid}`), {
      data: [...newDataList],
    });
  };
  // * for reading data from the firebase db
  const readDataFire = () => {
    const db = getDatabase();
    const dbref = ref(db, `paste-data/${User.uid}/data`);
    // snapshot carries all the data of firebase db
    onValue(dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();
        records.push(data);
      });
      if (snapshot.size === 0) {
        addDataFire(["example"]);
        return;
      }
      setDataList(records);
    });
  };
  // for checking data list is readed or not
  const [isDataListed, setIsDataListed] = React.useState(false);
  // firebase functions end ------------- //
  const [dataList, setDataList] = React.useState([]);
  // condition for redering list
  if (!isDataListed && User!==null) {
    readDataFire();
    // if (dataList.length === 0) {
    //   let newData = ["example"];
    //   addDataFire(newData);
    // }
    setIsDataListed(true);
  }
  // for toast message copy or deleted
  const [severity, setSeverity] = React.useState("success");
  const [message, setMessage] = React.useState("");

  // copy the data to clipboard and show toast
  const [copied, setCopied] = React.useState(false);

  // saved removed data for undo it
  const [undoData, setUndoData] = React.useState("");

  const removeDataItem = (index) => {
    let newDataList = [...dataList];
    setUndoData(newDataList.splice(index, 1).toString());
    addDataFire(newDataList);
    showToast("Item removed !", "error");
  };

  const undo = () => {
    let newDataList = [...dataList];
    newDataList.unshift(undoData);
    addDataFire(newDataList);
    hideToast();
  };
  // getting data that is paste/input by user
  const pasteDataItem = (pasteItem) => {
    // checking pasteItem is empty or not
    if(pasteItem.trim() === ""){
      return;
    }
    let newDataList = [...dataList];
    // if pasteItem is already in list then push it on top
    if(newDataList.indexOf(pasteItem) !== -1){
      newDataList.splice(newDataList.indexOf(pasteItem),1);
    }
    newDataList.unshift(pasteItem);
    // now sending new datalist to firebase
    addDataFire(newDataList);
  };

  // for showing message and color of toast
  const showToast = (messageToShow, severityToShow) => {
    setMessage(messageToShow);
    setSeverity(severityToShow);
    setCopied(true);
  };

  const hideToast = () => {
    setSeverity("success");
    setCopied(false);
  };

  // * Protecting routes
  // * children means home page, what is showing after login
  // wrap all the pages that you don't want to show before login
  const RequireAuth = ({ children }) => {
    return User !== null ? children : <Navigate to="/login" />;
  };

  // * Signed out than clear the data
  const clearDataList = ()=>{
    setDataList([]);
    setIsDataListed(false);
  }
  // where all copy paste done
  // * Toggle button for paste mode
  const [pasteMode, setPasteMode] = React.useState("input");

  const changePasteMode = (event, newMode) => {
    if(navigator.clipboard){
      setPasteMode(newMode);
    }
  };

  const Work = (
    <RequireAuth>
      <div className="box">
        <DataList
          dataList={dataList}
          removeDataItem={removeDataItem}
          showToast={showToast}
          changePasteMode={changePasteMode}
          pasteMode={pasteMode}
        />
        <Paste 
          pasteDataItem={pasteDataItem}
          pasteMode={pasteMode}
        />
        {copied ? (
          <ShowToast
            severity={severity}
            message={message}
            hideToast={hideToast}
            undo={undo}
          />
        ) : null}
      </div>
    </RequireAuth>
  );

  return (
    <React.Fragment>
      <Router>
      <Navbar currentUser={currentUser} clearDataList={clearDataList}/>
        <Routes>
          <Route exact path="/">
            <Route index element={<Home />} />
            <Route path="work" element={Work} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}
 
export default App;
