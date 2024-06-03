import { useAnimate } from "../../hooks/animatePages/useAnimate"
import classes from "./Settings.module.scss"

export function Settings() {
    const { animate } = useAnimate()
    return (
        <div className={`${classes.settingsPage} ${animate && classes.animateSettings}`}>
            <div className={classes.fakeContent}></div>
            <div className={classes.fakeContent}></div>
            <div className={classes.fakeContent}></div>
        </div>
    )
}
