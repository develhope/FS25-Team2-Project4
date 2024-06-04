import { MaterialSymbol } from "react-material-symbols"
import { useFilterChipRecipes } from "./useFilterChipRecipes"

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"

import classes from "./FilterChip.module.scss"
import { Check } from "@mui/icons-material"

export function FilterChipRecipes({ label }) {
    const { selectedState, handleSelected } = useFilterChipRecipes()

    return (
        <div className={`${classes.filterChip} ${selectedState ? classes.active : classes.inactive}`} onClick={handleSelected}>
            <CheckOutlinedIcon className={classes.ico} fontSize="18px" />
            <p className={classes.label}>{label}</p>
        </div>
    )
}
