import { useState } from "react"

export function useIngredientSuggestion(id, label, bgColor, isSelected, isBlackListed) {
    const [ingState, setIngState] = useState({
        id,
        label,
        bgColor,
        isSelected,
        isBlackListed,
    })

    return {
        ingState,
        setIngState,
    }
}
