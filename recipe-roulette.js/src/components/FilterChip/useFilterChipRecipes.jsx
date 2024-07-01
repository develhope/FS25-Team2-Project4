import { useEffect, useMemo, useState } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function useFilterChipRecipes(label, filterType, numericValue) {
    const [selectedState, setSelectedState] = useState(false)
    const { recipeFilter } = useRecipesContext()

    useEffect(() => {
        filterType === "cuisineEthnicity" &&
            setTimeout(() => {
                if (recipeFilter.cuisineEthnicity.some((cuisine) => cuisine.toLowerCase() === label.toLowerCase())) {
                    setSelectedState(true)
                } else {
                    setSelectedState(false)
                }
            }, 0)
            if (filterType === "caloricApport" || filterType ==="preparationTime" || filterType==="difficulty") {
                setTimeout(() => {
                    if (recipeFilter[filterType] === numericValue) {
                        setSelectedState(true)
                    } else {
                        setSelectedState(false)
                    }
                }, 0)
            }
    }, [recipeFilter])

    function handleSelected() {
        setSelectedState((prevState) => !prevState)
    }

    return {
        selectedState,
        handleSelected,
    }
}
