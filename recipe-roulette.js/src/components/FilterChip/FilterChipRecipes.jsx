import { MaterialSymbol } from "react-material-symbols"
import classes from "./FilterChip.module.scss"
import { useState } from "react"

export function FilterChipRecipes({ label }) {

    const [selectedState, setSelectedState] = useState(false)

    function handleSelected () {
        setSelectedState(prevState => !prevState)
    }

    return (
        <div className={`${classes.filterChip} ${selectedState ? classes.active : classes.inactive}`} onClick={handleSelected}>
            {selectedState ? <MaterialSymbol className={classes.ico} icon="check" size={18} grade={18} /> : null}
            <p className={classes.label}>{label}</p>
        </div>
    )
}
