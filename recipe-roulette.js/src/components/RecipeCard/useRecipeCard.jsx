import { useState } from "react"

export function useRecipeCard(isFav, isExpanded) {
    const [favState, setFavState] = useState(isFav)
    const [expandedCard, setExpandedCard] = useState(isExpanded)
    const [expandedIngredients, setExpandedIngredients] = useState(true)

    function handleFavState(e) {
        e.preventDefault()
        e.stopPropagation()
        setFavState((f) => !f)
    }

    function handleCardState(e) {
        e.stopPropagation()
        e.preventDefault()
        setExpandedCard((b) => !b)
    }

    function handleIngWrapperState(e) {
        e.stopPropagation()
        e.preventDefault()
        setExpandedIngredients((b) => !b)
    }

    return {
        favState,
        expandedCard,
        expandedIngredients,
        handleIngWrapperState,
        handleCardState,
        handleFavState,
    }
}
