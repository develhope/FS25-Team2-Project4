import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { useSearch } from "./useSearch"
import { useSearchSuggestion } from "./useSearchSuggestion"

export function SearchSuggestion({ing}) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useSearchSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick } = useSearch()

    return <p onClick={(e) => handleSuggestionClick(e, "isSelected", ingState, setIngState)}>{name}</p>
}
