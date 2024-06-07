import { MaterialSymbol } from "react-material-symbols"
import { useSnackbar } from "./useSnackbar"

import classes from "./Snackbar.module.scss"
import { useState } from "react"
import { createPortal } from "react-dom"
import { PopupLogin } from "../Pop-up/PopupLogin"
import { Button } from "../Buttons/Button/Button"

export function Snackbar() {
    const { isActive, message, handleCloseSnackbar, showBtn } = useSnackbar()
    const [showPopup, setShowPopup] = useState()

    return (
        <div className={`${classes.snackbar} ${isActive ? classes.snackbarActive : classes.snackbarInactive}`}>
            <div className={classes.leftItems}>
                <MaterialSymbol icon="error" weight={600} size={18} grade={18} />
                <p>{message}</p>
                {showBtn && <Button label="Log in" action={() => setShowPopup(true)} /> }
            </div>
            <div tabIndex={-1} onClick={handleCloseSnackbar} className={classes.rightItems}>
                <MaterialSymbol className={classes.ico} icon="close" size={24} grade={24} />
            </div>
            {showPopup && createPortal(
                <PopupLogin onClose={() => setShowPopup(false)} />,
                document.getElementById('popup-root')
            )}
        </div>
    )
}
