import { useNavigate } from "react-router-dom"
import classes from "./Button.module.scss"

export function Button({
    type = "button",
    width = "fitContent",
    label = "label",
    icon = null,
    action,
    active = true,
    prevPath = null,
    link = null,
    style = "secondary",
}) {
    const navigate = useNavigate()

    function handleOnClick() {
        action && action()
        setTimeout(() => {
            link && navigate(`/${link}`)
            prevPath && prevPath === "/recipes-results" && navigate("/recipes-results")
            prevPath && prevPath === "/login" && navigate("/")
            prevPath && prevPath === "/signup" && navigate("/")
        }, 0)
    }

    return (
        <button
            type={type}
            onClick={() => {active && handleOnClick()}}
            className={`${classes.button} ${!active && classes.disabled} 
            ${width === "fill" && classes.wideButton}
            ${style === "primary" && classes.primaryColor}
            ${style === "transparent" && classes.transparent}`}
        >
            {icon}
            {label}
        </button>
    )
}
