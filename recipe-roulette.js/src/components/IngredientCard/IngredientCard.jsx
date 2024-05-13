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

    const { handleIngredientsDecrement, ingredients } = useManageIngredients()

    const bg = {
        backgroundColor: cardState.color,
    }
    const border = {
        outline: `4px solid ${cardState.color}`,
    }

    return (
        <div
            // style={border}
            onClick={handleIngredientClick}
            className={`${classes.ingredientCard} ${classes.inputActive} ${cardState.state ? classes.selected : classes.unselected}`}
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
            <div className={classes.autocompleteSuggestions}>
                {ingredients
                    .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                    .map((ingredient) => {
                        return <p /* onclick */ key={ingredient.id}>{ingredient.name}</p>
                    })}
            </div>
        </div>
    )
}
