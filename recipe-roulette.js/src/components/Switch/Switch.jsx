import classes from "./Switch.module.scss"

export function Switch({ state = false, action = null, label, prop, filterWhat = "ingredients" }) {

    function handleSwitch() {
        action(prop)
    }

    return (
        <div className={classes.switchComponent}>
            <div onClick={handleSwitch} className={`${classes.switch} ${state && classes.select}`}>
                <div className={`${classes.selection} ${state ? classes.select : classes.unselect}`}></div>
            </div>
            {label && <p> {label}</p>}
        </div>
    )
}
