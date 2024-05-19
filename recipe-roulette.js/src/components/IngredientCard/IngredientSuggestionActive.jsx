import { useIngredientSearch } from "./useIngredientSearch"
import { useIngredientSuggestion } from "./useIngredientSuggestion"
import classes from "./IngredientSuggestion.module.scss"

export function IngredientSuggestionActive({ ing, prop }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick } = useIngredientSearch()

    return (
        <p
            className={`${classes.active} ${classes.ingredientSuggestion}`}
            onClick={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}
        >
            {name}
        </p>
    )
}
