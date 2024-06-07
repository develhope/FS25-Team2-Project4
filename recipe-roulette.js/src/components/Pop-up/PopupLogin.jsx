import classes from "./PopupLogin.module.scss";
import { Login } from "../authentication/login/Login";

export function PopupLogin({ onClose }) {

  function stopPropagation (e) {
    e.stopPropagation()
  }

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.popup} onClick={stopPropagation}>
        <Login />
      </div>
    </div>
  );
}
