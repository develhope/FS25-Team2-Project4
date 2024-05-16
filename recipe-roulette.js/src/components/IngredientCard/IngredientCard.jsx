import classes from "./IngredientCard.module.scss"
import { MaterialSymbol } from "react-material-symbols"
import { useIngredientCard } from "./useIngredientCard"
import { InputSuggestions } from "./InputSuggestions/InputSuggestions"
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
        handleXClick,
        inputValues,
        cardState,
        suggestions,
    } = useIngredientCard(label, id, isSelected, bgColor)
    const { displayedIngredients } = useManageIngredients()
    const bg = {
        backgroundColor: cardState.color,
    }
    return (
        <div
            className={`${classes.ingredientCard} ${cardState.inputActive ? classes.inputActive : classes.ingredientCard} ${cardState.state ? classes.selected : classes.unselected}`}
        >
            <div style={bg} className={classes.header} onClick={handleIngredientClick}>
                <div className={classes.leftItems}>
                    <MaterialSymbol
                        className={classes.checkIco}
                        icon="check_circle"
                        weight={500}
                        size={24}
                        grade={24}
                    />

                    <textarea
                        name="ingredient"
                        style={{ bgColor }}
                        type="text"
                        placeholder={inputValues.initial}
                        onClick={handleInputActivation}
                        onBlur={(e) =>
                            setTimeout(() => {
                                handleInputDeactivation(e)
                            }, 25)
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
            <InputSuggestions
                displayedIngredients={displayedIngredients}
                suggestions={suggestions}
                handleSuggestionClick={handleSuggestionClick}
            />
        </div>
    )
}
