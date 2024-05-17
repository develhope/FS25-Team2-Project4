import { useEffect, useMemo, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function useSearch() {
    const { ingredients, blackList, handleBlackListUpdate } = useManageIngredients()
    const [inputValues, setInputValues] = useState({ initial: "Search", current: "" })
    const [searchState, setSearchState] = useState({ inputActive: false })
    const [suggestions, setSuggestions] = useState(ingredients)

    useEffect(() => {
        setSuggestions(ingredients)
    }, [searchState])

    function handleInputActivation(e) {
        e.stopPropagation()
        setSearchState({ inputActive: true })
    }

    useMemo(() => {
        setSuggestions(ingredients)
    }, [ingredients])



    function handleInputChange(e) {
        const inputValue = e.target.value.toUpperCase()
        console.log(inputValue)

        setInputValues((prev) => ({ ...prev, current: e.target.value }))
        setSuggestions(
            ingredients.filter((ingredient) => ingredient.name.toUpperCase().includes(inputValue))
        )
    }

    function handleSuggestionClick(e, id) {
        e.stopPropagation()
        const clickedElement = ingredients.find((ingredient) => ingredient.id === id)
        setSearchState({ inputActive: false })
        handleBlackListUpdate(true, clickedElement.id)
        setInputValues((prev) => ({ ...prev, current: "" }))
    }

    function handleInputDeactivation(e) {
        const inputValue = e.target.value.toUpperCase()
        const isInDatabase = ingredients.filter(
            (ingredient) =>
                ingredient.name.toUpperCase().includes(inputValue) && !ingredient.isSelected
        )

        const isBlacklisted = blackList.filter((blIngredient) =>
            isInDatabase.some(
                (dbIngredient) =>
                    dbIngredient.id === blIngredient.id ||
                    dbIngredient.name.toUpperCase() === blIngredient.name.toUpperCase()
            )
        )

        const firstAvailableIngredient = isInDatabase.find(
            (dbIngredient) =>
                !isBlacklisted.some((blIngredient) => blIngredient.id === dbIngredient.id)
        )

        if (inputValue !== "" && firstAvailableIngredient) {
            setInputValues((prev) => ({ ...prev, current: "" }))
            setSearchState({ inputActive: false })
            handleBlackListUpdate(true, firstAvailableIngredient.id)
        } else {
            setInputValues((prev) => ({ ...prev, current: "" }))
            setSearchState({ inputActive: false })
        }
        setSuggestions(ingredients.filter((ing) => !ing.isBlacklisted))
    }

    function handleDeselectAll () {
        ingredients.forEach(ing => {
            handleBlackListUpdate(false, ing.id)
        })
    }
    function handlePressEnter(e) {
        if (e.keyCode === 13) {
            e.target.blur()
        }
    }

    function handleXClick(e) {
        e.stopPropagation()
        setSearchState({ inputActive: false })
    }

    return {
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handleSuggestionClick,
        handlePressEnter,
        inputValues,
        searchState,
        suggestions,
        handleXClick,
        handleDeselectAll
    }
}
