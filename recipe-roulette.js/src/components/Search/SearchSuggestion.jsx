import { useSearch } from "./useSearch"
import { useSearchSuggestion } from "./useSearchSuggestion"

export function SearchSuggestion(ing, { prop }) {
    const { ingState, setIngState } = useSearchSuggestion(ing)
    const { handleSuggestionClick } = useSearch()

    return <p onClick={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}>{ing.label}</p>
}
