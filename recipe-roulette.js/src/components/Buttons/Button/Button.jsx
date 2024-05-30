import { MaterialSymbol } from "react-material-symbols"
import classes from "./Button.module.scss"

export function Button({
    width = "fitContent",
    label = "label",
    icon = "circle",
    size = 18,
    action,
    active = true,
    iconWheight = 500,
}) {
    return (
        <button
            type="button"
            onClick={action}
            className={`${classes.button} ${!active && classes.disabled} ${width === "fill" && classes.wideButton}`}
        >
            <MaterialSymbol className={classes.ico} weight={iconWheight} icon={icon} size={size} grade={size} />
            {label}
        </button>
    )
}
