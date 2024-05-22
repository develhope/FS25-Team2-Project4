import { useEffect, useState } from "react"
import classes from "./Switch.module.scss"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function Switch({ label, prop }) {
    const { toggleFilter, filter } = useManageIngredients()
    const [state, setState] = useState(filter[prop])

    function handleSwitch() {
        toggleFilter(prop, setState)
    }
    useEffect(()=> {
        setState(filter[prop])
    },[filter])

    return (
        <div className={classes.switchComponent}>
            <div onClick={handleSwitch} className={`${classes.switch} ${state && classes.select}`}>
                <div className={`${classes.selection} ${state ? classes.select : classes.unselect}`}></div>
            </div>
            {label && <p> {label}</p>}
        </div>
    )
}
