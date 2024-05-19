import { useEffect, useMemo, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function useIngredientSearch() {
    const { ing, blackList, selectedIng, handleDeselectAll, handleIngUpdate } = useManageIngredients()
    const [inputValues, setInputValues] = useState({ initial: "Search", current: "" })
    const [searchState, setSearchState] = useState({ inputActive: false })
    const [suggestions, setSuggestions] = useState(ing)
    const [cardState, setCardState] = useState({
        id: null,
        label: null,
        bgColor: null,
        isSelected: null,
        isBlacklisted: null,
    })

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
        setSuggestions(ing.filter((ingredient) => ingredient.name.toUpperCase().includes(inputValue)))
    }

    function handleInputDeactivation(e, prop) {
        console.log("gaming");
        console.log(prop);
        let firstAvailableIngredient
        const inputValue = e.target.value.toUpperCase()
        const isInDatabase = ing.filter(
            (ingredient) =>
                ingredient.name.toUpperCase().includes(inputValue) && !ingredient.isSelected && !ingredient.isBlacklisted
        )
        if (prop === "isBlackListed") {
            console.log("broo");
            const isAlreadyBL = blackList.filter((blIngredient) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === blIngredient.id || dbIngredient.name.toUpperCase() === blIngredient.name.toUpperCase()
                )
            )
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !isAlreadyBL.some((blIngredient) => blIngredient.id === dbIngredient.id)
            )
        } else if (prop === "isSelected") {
            console.log("siss");

            const isAlreadySelected = selectedIng.filter((selectedIng) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === selectedIng.id || dbIngredient.name.toUpperCase() === selectedIng.name.toUpperCase()
                )
            )

            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !isAlreadySelected.some((blIngredient) => blIngredient.id === dbIngredient.id)
            )
        }        
        if (inputValue !== "" && firstAvailableIngredient) {
            setInputValues((prev) => ({ ...prev, current: "" }))
            setSearchState({ inputActive: false })
            handleIngUpdate(prop, firstAvailableIngredient, setCardState)
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
