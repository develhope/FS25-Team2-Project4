import classes from "./IcoButton.module.scss"

export function IcoButton({ icon = "circle", size = 18, action, active = true, iconWheight = 500 }) {
    return (
        <button type="button" onClick={action} className={`${classes.button} ${!active && classes.disabled}`}>
           {icon}
        </button>
    )
}
