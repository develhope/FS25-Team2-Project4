import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"

export function IngredientCard({
    id,
    label = "ingredient",
    bgColor = "#fbfbfb",
    isSelected = false,
}) {
    const {
        handleIngredientClick,
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handlePressEnter,
        inputValues,
        cardState
    } = useIngredientCard(label, id, isSelected, bgColor)

    const bg = {
        backgroundColor: cardState.color,
    }

    return (
        <div
            onClick={handleIngredientClick}
            className={`${classes.ingredientCard}  ${cardState.state ? classes.selected : classes.unselected}`}
        >
            <div style={bg} className={classes.header}>
                <div className={classes.leftItems}>
                    <MaterialSymbol
                        className={classes.checkIco}
                        icon="check_circle"
                        size={24}
                        grade={24}
                    />

                    <textarea
                        style={{ bgColor }}
                        type="text"
                        placeholder={inputValues.initial}
                        onClick={handleInputActivation}
                        onBlur={handleInputDeactivation}
                        onKeyDown={handlePressEnter}
                        onChange={handleInputChange}
                        value={inputValues.current}
                    />
                </div>

                <div className={classes.closeIco}>
                    <MaterialSymbol icon="close" size={24} grade={24} />
                </div>
            </div>
        </div>
    )
}
