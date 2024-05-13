import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { useEffect } from "react"

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
        cardState,
    } = useIngredientCard(label, id, isSelected, bgColor)

    const { handleIngredientsDecrement } = useManageIngredients()

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
                    <MaterialSymbol className={classes.checkIco} icon="lock" size={24} grade={24} />

                    <textarea
                        name="ingredient"
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

                <div
                    className={classes.closeIco}
                    onClick={(e) => handleIngredientsDecrement(id, e)}
                >
                    <MaterialSymbol icon="close" size={24} grade={24} />
                </div>
            </div>
        </div>
    )
}
