import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

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
        handleSuggestionClick,
        handlePressEnter,
        inputValues,
        cardState,
        suggestions,
    } = useIngredientCard(label, id, isSelected, bgColor)

    const { handleIngredientsDecrement } = useManageIngredients()

    const bg = {
        backgroundColor: cardState.color,
    }
    const actBorder = {
        outline: `4px solid ${cardState.color}`,
    }
    const inactBorder = {
        outline: `2px solid #ece9e8`,
    }

    return (
        <div
            onClick={handleIngredientClick}
            style={cardState.inputActive ? actBorder : inactBorder}
            className={`${classes.ingredientCard} ${cardState.inputActive ? classes.inputActive : classes.inputInactive} ${cardState.state ? classes.selected : classes.unselected}`}
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
                {suggestions &&
                    suggestions
                        .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                        .map((ingredient) => {
                            return (
                                <p
                                    onClick={(e) => handleSuggestionClick(e, ingredient.id)}
                                    key={ingredient.id}
                                >
                                    {ingredient.name}
                                </p>
                            )
                        })}
            </div>
        </div>
    )
}
