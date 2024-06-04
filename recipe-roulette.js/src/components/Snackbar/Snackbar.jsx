import { MaterialSymbol } from "react-material-symbols"
import { useSnackbar } from "./useSnackbar"

import classes from "./Snackbar.module.scss"

export function Snackbar() {
    const { isActive, message, handleCloseSnackbar } = useSnackbar()
    return (
        <div className={`${classes.snackbar} ${isActive ? classes.snackbarActive : classes.snackbarInactive}`}>
            <div className={classes.leftItems}>
                <MaterialSymbol icon="error" weight={600} size={18} grade={18} />
                <p>{message}</p>
            </div>
            <div tabIndex={-1} onClick={handleCloseSnackbar} className={classes.rightItems}>
                <MaterialSymbol className={classes.ico} icon="close" size={24} grade={24} />
            </div>
        </div>
    )
}
