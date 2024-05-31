import { MaterialSymbol } from "react-material-symbols"
import classes from "./FilterChip.module.scss"
import { useFilterChips } from "./useFilterChip"

export function FilterChip({ id, label, bgColor, isSelected, isBlackListed }) {
    const { handleDeselectChip } = useFilterChips(id, label, bgColor, isSelected, isBlackListed)

    return (
        <div className={`${classes.filterChip} ${isSelected || isBlackListed ? classes.active : classes.inactive}`} onClick={handleDeselectChip}>
            {isSelected && <MaterialSymbol className={classes.ico} icon="check" size={16} grade={16} />}
            {isBlackListed && <MaterialSymbol className={classes.ico} icon="block" size={16} grade={16} />}
            <p className={classes.label}>{label}</p>
        </div>
    )
}
