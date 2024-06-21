import { useSnackbar } from "./useSnackbar"
import { useState } from "react"
import { useLoginToSignup } from "../../hooks/loginToSignup/useLoginToSignup"
import { createPortal } from "react-dom"
import { Popup } from "../Pop-up/Popup"
import { Button } from "../Buttons/Button/Button"
import { Login } from "../authentication/login/Login"
import { Signup } from "../authentication/signup/Signup"

import CloseIcon from "@mui/icons-material/Close"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import classes from "./Snackbar.module.scss"

export function Snackbar() {
    const { isActive, message, handleCloseSnackbar, showBtn } = useSnackbar()
    const [showPopup, setShowPopup] = useState()
    const { changeToSignup, setChangeToSignup } = useLoginToSignup()

    return (
        <div className={`${classes.snackbar} ${isActive ? classes.snackbarActive : classes.snackbarInactive}`}>
            <div className={classes.leftItems}>
                <ErrorOutlineIcon fontSize="small" />
                <p>{message}</p>
                {showBtn && <Button label="Log in" action={() => setShowPopup(true)} />}
            </div>
            <div tabIndex={-1} onClick={handleCloseSnackbar} className={classes.rightItems}>
                <CloseIcon fontSize="small" />
            </div>
            {showPopup &&
                createPortal(
                    <Popup handleClosePopup={() => setShowPopup(false)}>
                        {!changeToSignup ? (
                            <Login setChangeToSignup={setChangeToSignup} setShowPopup={setShowPopup} />
                        ) : (
                            <Signup setChangeToSignup={setChangeToSignup} setShowPopup={setShowPopup} />
                        )}
                    </Popup>,
                    document.getElementById("popup-root")
                )}
        </div>
    )
}
