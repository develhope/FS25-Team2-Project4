import classes from "./Popup.module.scss"

export function PopupLogin({ handleClosePopup, children }) {
    function stopPropagation(e) {
        e.stopPropagation()
    }

    return (
        <div className={classes.overlay} onClick={() => handleClosePopup()}>
            <div className={classes.popup} onClick={(e) => stopPropagation(e)}>
                {children}
            </div>
        </div>
    )
}
