import { useIngredientSearch } from "../SearchBar/useIngredientSearch"
import { useIngredientSuggestion } from "./useIngredientSuggestion"
import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestionActive({ ing, prop }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick } = useIngredientSearch()

    return (
        <p
            className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
            onClick={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}
        >
            {name}
        </p>
    )
}
