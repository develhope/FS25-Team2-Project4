import { useNavigate } from "react-router-dom"
import classes from "./Button.module.scss"

export function Button({ width = "fitContent", label = "label", icon = "circle", action, active = true, link = null }) {
    const navigate = useNavigate()
    
    return (
        <button
            type="button"
            onClick={()=>{
                action()
                link && navigate(`/${link}`)
            }}
            className={`${classes.button} ${!active && classes.disabled} ${width === "fill" && classes.wideButton}`}
        >
            {icon}
            {label}
        </button>
    )
}
