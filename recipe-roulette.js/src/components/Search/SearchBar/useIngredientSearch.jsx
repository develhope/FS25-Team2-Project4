import { useEffect, useMemo, useState } from "react"
import { useManageIngredients } from "../../../pages/Discovery/IngredientsContext"
import { useSnackbar } from "../../Snackbar/useSnackbar"

export function useIngredientSearch(isFixed, searchCriteria) {
    const { ing, blackList, displayedIng, handleDeselectAll, handleIngUpdate, setRefresh, filteredIng } = useManageIngredients()
    const { handleOpenSnackbar } = useSnackbar()

    const [condition, setCondition] = useState(true)
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
    }, [searchState.inputActive])

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
        const selectedIngs = displayedIng.filter((ing) => ing.isSelected)
        if (prop === "isBlackListed") {
            handleIngUpdate(prop, cardState, setCardState)
        } else if (prop === "isSelected") {
            if (selectedIngs.length === 8 && !cardState.isSelected) {
                handleOpenSnackbar("You've reached the maximum number of ingredients!")
            } else {
                handleIngUpdate(prop, cardState, setCardState)
            }
        }
        setSearchState({ inputActive: false })
        setInputValues((prev) => ({ ...prev, current: "" }))
    }

    const handleInputDeactivation = (prop) => {
        let firstAvailableIngredient
        const selectedIngs = displayedIng.filter((ing) => ing.isSelected)

        let isInDatabase = filteredIng.filter(
            (ingredient) =>
                ingredient.name.toUpperCase().includes(inputValues.current.toUpperCase()) &&
                !ingredient.isSelected &&
                !ingredient.isBlackListed
        )

        if (prop === "isBlackListed") {
            const notAlreadyBL = blackList.filter((blIngredient) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === blIngredient.id || dbIngredient.name.toUpperCase() === blIngredient.name.toUpperCase()
                )
            )
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !notAlreadyBL.some((blIngredient) => blIngredient.id === dbIngredient.id)
            )
        } else if (prop === "isSelected") {
            const notAlreadySelected = selectedIngs.filter((onDisplay) =>
                isInDatabase.some(
                    (dbIngredient) =>
                        dbIngredient.id === onDisplay.id || dbIngredient.name.toUpperCase() === onDisplay.name.toUpperCase()
                )
            )
            firstAvailableIngredient = isInDatabase.find(
                (dbIngredient) => !notAlreadySelected.some((blIngredient) => blIngredient.id === dbIngredient.id)
            )
            if (firstAvailableIngredient && selectedIngs.length === 8) {
                handleOpenSnackbar("You've reached the maximum number of ingredients!")
            }
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
            handleBlur(e)
        } else if (e.keyCode === 27) {
            handleBlur(e)
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
        setCondition,
        inputValues,
        searchState,
        suggestions,
        fixedPosition,
        condition,
    }
}
