import classes from "./PopupLogin.module.scss"
import { useState } from "react";
import { Login } from "../authentication/login/Login";

export function PopupLogin() {
  const [showPopup, setShowPopup] = useState(false);

  function handleShow() {
    setShowPopup(true);
  }

  function handleClosePopup () {
    setShowPopup(false)
  }

  return (
  <div>
    <div>
        <button onClick={handleShow}>Show</button>
        {showPopup &&
        <div className={classes.overlay} onClick={handleClosePopup} >
            <div className={classes.popup}>
                <Login/>
            </div>
        </div>}
    </div>
    </div>
        );
}
