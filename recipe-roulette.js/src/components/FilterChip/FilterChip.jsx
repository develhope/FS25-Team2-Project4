import { MaterialSymbol } from "react-material-symbols"
import { useFilterChips } from "./useFilterChip"

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"

import classes from "./FilterChip.module.scss"

export function FilterChip({ id, label, bgColor, isSelected, isBlackListed }) {
    const { handleDeselectChip } = useFilterChips(id, label, bgColor, isSelected, isBlackListed)

    return (
        <div
            className={`${classes.filterChip} ${isSelected || isBlackListed ? classes.active : classes.inactive}`}
            onClick={handleDeselectChip}
        >
            {isSelected && (
         
                    <CheckOutlinedIcon className={classes.ico} fontSize="18px" />
        
            )}
            {isBlackListed && (

                    <BlockOutlinedIcon className={classes.ico} fontSize="18px" />
            )}
            <p className={classes.label}>{label}</p>
        </div>
    )
}
