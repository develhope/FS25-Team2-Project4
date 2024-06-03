import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"

import LockOpenIcon from "@mui/icons-material/LockOpen"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import CloseIcon from "@mui/icons-material/Close"

export function IngredientCard({ ing }) {
    const { handleIngredientClick, handleXClick, cardState } = useIngredientCard(ing)
    const bg = {
        backgroundColor: cardState.bgColor,
    }
    return (
        <div
            onClick={handleIngredientClick}
            style={bg}
            className={`${classes.ingredientCard} ${cardState.isSelected ? classes.selected : classes.unselected}`}
        >
            <div className={classes.leftItems}>
                {!cardState.isSelected ? (
                    <LockOpenIcon className={classes.checkIco} />
                ) : (
                    <LockOutlinedIcon className={classes.checkIco} />
                )}
                <p>{ing.name}</p>
            </div>
            <div className={classes.rightItems}>
                <CloseIcon onClick={(e) => handleXClick(e)} className={classes.rightIco} />
            </div>
        </div>
    )
}
