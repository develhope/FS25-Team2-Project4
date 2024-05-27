import { MaterialSymbol } from "react-material-symbols"
import classes from "./FilterChip.module.scss"
import { useFilterChips } from "./useFilterChip"

export function FilterChip({ id, label, bgColor, isSelected, isBlackListed }) {
    const { handleDeselectChip } = useFilterChips(id, label, bgColor, isSelected, isBlackListed)

    return (
        <div className={`${classes.filterChip} ${classes.active}`} onClick={handleDeselectChip}>
            <MaterialSymbol className={classes.ico} icon="check" size={18} grade={18} />
            <p className={classes.label}>{label}</p>
        </div>
    )
}
