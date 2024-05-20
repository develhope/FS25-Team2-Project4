import { useState } from "react"
import classes from "./Switch.module.scss"

export function Switch({ label }) {
    const [state, setState] = useState(false)

    function handleSwitch() {
        setState((s) => !s)
    }

    return (
        <div className={classes.switchComponent}>
            <div onClick={handleSwitch} className={`${classes.switch} ${state && classes.select}`}>
                <div
                    className={`${classes.selection} ${state ? classes.select : classes.unselect}`}
                ></div>
            </div>
            {label && <p> {label}</p>}
        </div>
    )
}
