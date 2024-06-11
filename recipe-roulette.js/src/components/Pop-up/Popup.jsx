import classes from "./Popup.module.scss";

export function PopupLogin({ onClose, children }) {

  function stopPropagation (e) {
    e.stopPropagation()
  }

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.popup} onClick={(e) => stopPropagation(e)}>
        {children}
      </div>
    </div>
  );
}