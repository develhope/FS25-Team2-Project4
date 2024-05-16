import { MaterialSymbol } from "react-material-symbols"
import classes from "./FilterChip.module.scss"
import { useFilterChips } from "./useFilterChip"

export function FilterChip({ label, id }) {
    const { handleDeselectChip } = useFilterChips(id)

    return (
        <div className={classes.filterChip} onClick={handleDeselectChip}>
            <MaterialSymbol icon="check" />
            <p>{label}</p>
        </div>
    )
}
