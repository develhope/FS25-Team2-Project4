import { useState } from "react"

export function useSearchSuggestion(ing) {
    const [ingState, setIngState] = useState({
        id: ing.id,
        label: ing.label,
        bgColor: ing.bgColor,
        isSelected: ing.isSelected,
        isBlackListed: ing.isBlackListed,
    })

    return {
        ingState,
        setIngState,
    }
}
