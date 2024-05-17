import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"


export function IngredientCard({
    id,
    label = "ingredient",
    bgColor = "#fbfbfb",
    isSelected = false,
}) {
    const { handleIngredientClick, handleXClick, cardState } = useIngredientCard(
        label,
        id,
        isSelected,
        bgColor
    )
    const bg = {
        backgroundColor: cardState.color,
    }
    return (
        <div
            onClick={handleIngredientClick}
            style={bg}
            className={`${classes.ingredientCard} ${cardState.state ? classes.selected : classes.unselected}`}
        >
                <div className={classes.leftItems}>
                    <MaterialSymbol
                        className={classes.checkIco}
                        icon="check_circle"
                        weight={300}
                        size={24}
                        grade={24}
                    />

                    <p>{label}</p>
                </div>
                <div className={classes.rightItems}>
                    <MaterialSymbol
                        className={classes.rightIco}
                        onClick={(e) => handleXClick(e)}
                        icon="close"
                        weight={300}
                        size={24}
                        grade={24}
                    />
                </div>
        </div>
    )
}
