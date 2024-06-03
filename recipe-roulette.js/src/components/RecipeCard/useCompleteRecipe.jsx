import { useState } from "react"

export function useCompleteRecipe(initialValue) {
    const [completeRecipe, setCompleteRecipe] = useState(initialValue)

    return {
        setCompleteRecipe,
        completeRecipe,
    }
}
