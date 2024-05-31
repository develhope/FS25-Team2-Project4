import classes from "./Button.module.scss"

export function Button({
    width = "fitContent",
    label = "label",
    icon = "circle",
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
            {icon}
            {label}
        </button>
    )
}
