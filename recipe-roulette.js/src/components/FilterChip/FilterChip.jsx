import { MaterialSymbol } from "react-material-symbols"
import classes from "./FilterChip.module.scss"
import { useFilterChips } from "./useFilterChip"

export function FilterChip({ id, label, bgColor, isSelected, isBlackListed }) {
    const { handleDeselectChip } = useFilterChips(id, label, bgColor, isSelected, isBlackListed)

    return (
        <div className={`${classes.filterChip} ${classes.active}`} onClick={handleDeselectChip}>
            <MaterialSymbol icon="check" />
            <p>{label}</p>
        </div>
    )
}
