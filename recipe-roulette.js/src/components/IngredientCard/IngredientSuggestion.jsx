import { useIngredientSearch } from "./useIngredientSearch"
import { useIngredientSuggestion } from "./useIngredientSuggestion"

export function IngredientSuggestion({ing}) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick } = useIngredientSearch()

    return <p onClick={(e) => handleSuggestionClick(e, "isSelected", ingState, setIngState)}>{name}</p>
}
