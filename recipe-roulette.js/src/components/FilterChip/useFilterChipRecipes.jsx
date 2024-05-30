import { useState } from "react"

export function useFilterChipRecipes () {
    const [selectedState, setSelectedState] = useState(false)

    function handleSelected () {
        setSelectedState(prevState => !prevState)
    }

    return {
        selectedState,
        handleSelected
    }

}