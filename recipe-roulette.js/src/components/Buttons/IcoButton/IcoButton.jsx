import { useNavigate } from "react-router-dom"
import classes from "./IcoButton.module.scss"

export function IcoButton({ style = "default", navigateTo = null, icon = null, action = null, active = true }) {
    const navigate = useNavigate()
    return (
        <button
            type="button"
            onClick={() => {
                action && action()
                setTimeout(() => {
                    navigateTo && navigate(navigateTo)
                }, 0);
            }}
            className={`
                ${classes.button}
                ${style === "transparent" && classes.noBorder} 
                ${!active && classes.disabled}
            `}
        >
            {icon}
        </button>
    )
}
