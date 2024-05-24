import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"

export function IngredientCard({ ing }) {
    const { handleIngredientClick, handleXClick, cardState } = useIngredientCard(
        ing.id,
        ing.name,
        ing.bgColor,
        ing.isSelected,
        ing.isBlackListed
    )
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
                {cardState.isSelected ? (
                    <MaterialSymbol className={classes.checkIco} icon="lock" weight={600} size={20} grade={20} />
                ) : (
                    <MaterialSymbol className={classes.checkIco} icon="lock_open" weight={600} size={18} grade={18} />
                )}
                <p>{ing.name}</p>
            </div>
            <div className={classes.rightItems}>
                <MaterialSymbol
                    onClick={(e) => handleXClick(e)}
                    className={classes.rightIco}
                    icon="close"
                    weight={500}
                    size={22}
                    grade={22}
                />
            </div>
        </div>
    )
}
