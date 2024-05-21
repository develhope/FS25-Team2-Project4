import { useEffect, useMemo, useState } from "react"
import { useManageIngredients } from "../../../pages/Discovery/IngredientsContext"

export function useIngredientSearch(isFixed) {
    const { ing, blackList, selectedIng, handleDeselectAll, handleIngUpdate, setRefresh } = useManageIngredients()
    const [inputValues, setInputValues] = useState({ initial: "Search", current: "" })
    const [searchState, setSearchState] = useState({ inputActive: false })
    const [suggestions, setSuggestions] = useState(ing)
    const [fixedPosition, setFixedPosition] = useState(false)
    const [cardState, setCardState] = useState({
        id: null,
        label: null,
        bgColor: null,
        isSelected: null,
        isBlacklisted: null,
    })

    useEffect(() => {
        setSuggestions(ing)
    }, [searchState.inputActive])

    function handleInputActivation(e) {
        e.stopPropagation()
        isFixed && setFixedPosition(true)
        setSearchState({ inputActive: true })
    }

    useMemo(() => {
        setSuggestions(ing)
    }, [ing])

    //input controls
    function handleInputChange(e) {
        const inputValue = e.target.value.toUpperCase()
        setInputValues((prev) => ({ ...prev, current: e.target.value }))
        setSuggestions(ing.filter((ingredient) => ingredient.name.toUpperCase().includes(inputValue)))
    }

    function handleInputDeactivation(e, prop) {
        let firstAvailableIngredient
        const inputValue = e.target.value.toUpperCase()
        const isInDatabase = ing.filter(
            (ingredient) =>
                ingredient.name.toUpperCase().includes(inputValue) && !ingredient.isSelected && !ingredient.isBlacklisted
        )
        if (prop === "isBlackListed") {
            const isAlreadyBL = blackList.filter((blIngredient) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === blIngredient.id || dbIngredient.name.toUpperCase() === blIngredient.name.toUpperCase()
                )
            )
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !isAlreadyBL.some((blIngredient) => blIngredient.id === dbIngredient.id)
            )
        } else if (prop === "isSelected" && selectedIng.length < 8) {
            const isAlreadySelected = selectedIng.filter((selectedIng) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === selectedIng.id || dbIngredient.name.toUpperCase() === selectedIng.name.toUpperCase()
                )
            )
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !isAlreadySelected.some((blIngredient) => blIngredient.id === dbIngredient.id)
            )
        } else {
            //snackbar di avviso che spunta dal basso
            console.log("maximum number of ingredient reached!")
        }
        if (inputValue !== "" && firstAvailableIngredient) {
            setInputValues((prev) => ({ ...prev, current: "" }))
            setSearchState({ inputActive: false })
            handleIngUpdate(prop, firstAvailableIngredient, setCardState)
            setRefresh((b) => !b)
        } else {
            setInputValues((prev) => ({ ...prev, current: "" }))
            setSearchState({ inputActive: false })
        }
        setSuggestions(ing.filter((ing) => !ing.isBlacklisted))
        isFixed && setFixedPosition(false)
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
        if (selectedIng.length < 8) {
            handleIngUpdate(prop, cardState, setCardState)
            setSearchState({ inputActive: false })
        } else {
            //snackbar di avviso che spunta dal basso
            console.log("maximum number of ingredient reached!")
        }
        setInputValues((prev) => ({ ...prev, current: "" }))
        setRefresh((b) => !b)
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
        fixedPosition,
    }
}
