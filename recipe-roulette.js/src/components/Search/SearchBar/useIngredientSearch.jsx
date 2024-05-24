import { useEffect, useMemo, useState } from "react"
import { useManageIngredients } from "../../../pages/Discovery/IngredientsContext"

export function useIngredientSearch(isFixed, searchCriteria) {
    const { ing, blackList, selectedIng, handleDeselectAll, handleIngUpdate, setRefresh, filter } = useManageIngredients()

    const [inputValues, setInputValues] = useState({ initial: "", current: "" })
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
    }, [searchState.inputActive, selectedIng])

    useMemo(() => {
        setSuggestions(ing)
    }, [ing])

    const handleInputActivation = (e) => {
        e.stopPropagation()
        isFixed && setFixedPosition(true)
        setSearchState({ inputActive: true })
    }
    const handleBlur = (e) => {
        e.target.blur()
        setSearchState({ inputActive: false })
        setInputValues((prev) => ({ ...prev, current: "" }))
        setFixedPosition(false)
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toUpperCase()
        setInputValues((prev) => ({ ...prev, current: e.target.value }))
        setSuggestions(ing.filter((ingredient) => ingredient.name.toUpperCase().includes(inputValue)))
    }

    const handleSuggestionClick = (e, prop, cardState, setCardState) => {
        e.stopPropagation()
        setInputValues((prev) => ({ ...prev, current: cardState.label }))
        if (prop === "isBlackListed") {
            handleIngUpdate(prop, cardState, setCardState)
        } else if (prop === "isSelected" && selectedIng.length < 8) {
            handleIngUpdate(prop, cardState, setCardState)
        } else {
            // snackbar di avviso che spunta dal basso
            console.log("maximum number of ingredient reached!")
        }
        setSearchState({ inputActive: false })
        setRefresh((b) => !b)
        setInputValues((prev) => ({ ...prev, current: "" }))
    }

    const handleInputDeactivation = (prop) => {
        let firstAvailableIngredient

        let isInDatabase = ing.filter(
            (ingredient) =>
                ingredient.name.toUpperCase().includes(inputValues.current.toUpperCase()) &&
                !ingredient.isSelected &&
                !ingredient.isBlackListed
        )
        if (filter.isGlutenFree) {
            isInDatabase = isInDatabase.filter((item) => item.isGlutenFree)
        }
        if (filter.isVegetarian) {
            isInDatabase = isInDatabase.filter((item) => item.isVegetarian)
        }
        if (filter.isVegan) {
            isInDatabase = isInDatabase.filter((item) => item.isVegan)
        }

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
            // snackbar di avviso che spunta dal basso
            console.log("maximum number of ingredient reached!")
        }
        if (inputValues.current !== "" && firstAvailableIngredient) {
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

    const handlePressEnter = (e) => {
        if (e.keyCode === 13) {
            handleInputDeactivation(searchCriteria)
            //disattiva l'input dopo aver chiamato la funzione (previene comportamenti indesiderati)
            setTimeout(() => {
                e.target.blur()
            }, 0)
        }
    }

    const handleXClick = (e) => {
        e.stopPropagation()
        setSearchState({ inputActive: false })
    }

    const handleReset = (prop, cardState, setCardState) => {
        handleDeselectAll(prop, cardState, setCardState)
    }

    return {
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handleSuggestionClick,
        handlePressEnter,
        handleXClick,
        handleReset,
        setInputValues,
        handleBlur,
        inputValues,
        searchState,
        suggestions,
        fixedPosition,
    }
}
