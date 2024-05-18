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
                <MaterialSymbol className={classes.checkIco} icon="check_circle" weight={300} size={24} grade={24} />
                <p>{ing.name}</p>
            </div>
            <div className={classes.rightItems}>
                <MaterialSymbol
                    //onClick function to edit
                    className={classes.rightIco}
                    icon="edit_note"
                    weight={300}
                    size={24}
                    grade={24}
                />
                <MaterialSymbol
                    onClick={(e) => handleXClick(e)}
                    className={classes.rightIco}
                    icon="close"
                    weight={300}
                    size={24}
                    grade={24}
                />
            </div>
        </div>
    )
}
