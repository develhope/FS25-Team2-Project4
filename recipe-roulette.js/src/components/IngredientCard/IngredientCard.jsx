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
        handleSuggestionClick,
        handlePressEnter,
        handleXClick,
        inputValues,
        cardState,
        suggestions,
    } = useIngredientCard(label, id, isSelected, bgColor)

    const bg = {
        backgroundColor: cardState.color,
    }

    return (
        <div
            className={`${classes.ingredientCard} ${cardState.inputActive ? classes.inputActive : classes.ingredientCard} ${cardState.state ? classes.selected : classes.unselected}`}
        >
            <div style={bg} className={classes.header} onClick={handleIngredientClick}>
                <div className={classes.leftItems}>
                    <MaterialSymbol className={classes.checkIco} icon="check_circle" weight={500} size={24} grade={24} />

                    <textarea
                        name="ingredient"
                        style={{ bgColor }}
                        type="text"
                        placeholder={inputValues.initial}
                        onClick={handleInputActivation}
                        onBlur={(e) =>
                            setTimeout(() => {
                                handleInputDeactivation(e)
                            }, 100)
                        }
                        onKeyDown={handlePressEnter}
                        onChange={handleInputChange}
                        value={inputValues.current}
                    />
                </div>

                <div className={classes.closeIco} onClick={(e) => handleXClick(e)}>
                    <MaterialSymbol className="symbol" icon="close" size={24} grade={24} />
                </div>
            </div>
            <div className={classes.autocompleteSuggestions}>
                {suggestions &&
                    suggestions
                        .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                        .map((ingredient) => {
                            if (!ingredient.isSelected) {
                                return (
                                    <p
                                        className={classes.active}
                                        onClick={(e) => handleSuggestionClick(e, ingredient.id)}
                                        key={ingredient.id}
                                    >
                                        {ingredient.name}
                                    </p>
                                )
                            } else {
                                return (
                                    <p
                                        className={classes.inactive}
                                     
                                        key={ingredient.id}
                                    >
                                        {ingredient.name}
                                    </p>
                                )
                            }
                        })}
            </div>
        </div>
    )
}
