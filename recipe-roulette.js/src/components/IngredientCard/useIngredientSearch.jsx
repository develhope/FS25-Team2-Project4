import { useEffect, useMemo, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function useIngredientSearch() {
    const { ing, blackList, handleDeselectAll, handleIngUpdate } = useManageIngredients()
    const [inputValues, setInputValues] = useState({ initial: "Search", current: "" })
    const [searchState, setSearchState] = useState({ inputActive: false })
    const [suggestions, setSuggestions] = useState(ing)

    useEffect(() => {
        setSuggestions(ing)
    }, [searchState])

    function handleInputActivation(e) {
        e.stopPropagation()
        setSearchState({ inputActive: true })
    }

    useMemo(() => {
        setSuggestions(ing)
    }, [ing])

    //input controls
    function handleInputChange(e) {
        const inputValue = e.target.value.toUpperCase()
        console.log(inputValue)

        setInputValues((prev) => ({ ...prev, current: e.target.value }))
        setSuggestions(
            ing.filter((ingredient) => ingredient.name.toUpperCase().includes(inputValue))
        )
    }

    function handleInputDeactivation(e) {
        const inputValue = e.target.value.toUpperCase()
        const isInDatabase = ing.filter(
            (ingredient) =>
                ingredient.name.toUpperCase().includes(inputValue) &&
                !ingredient.isSelected &&
                !ingredient.isBlacklisted
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
        setSuggestions(ing.filter((ing) => !ing.isBlacklisted))
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

    //handle ingredient updates
    function handleReset(prop, cardState, setCardState) {
        handleDeselectAll(prop, cardState, setCardState)
    }

    function handleSuggestionClick(e, prop, cardState, setCardState) {
        e.stopPropagation()
        handleIngUpdate(prop, cardState, setCardState)
        setSearchState({ inputActive: false })
        setInputValues((prev) => ({ ...prev, current: "" }))
    }

    return {
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handleSuggestionClick,
        handlePressEnter,
        handleXClick,
        handleReset,
        inputValues,
        searchState,
        suggestions,
    }
}
