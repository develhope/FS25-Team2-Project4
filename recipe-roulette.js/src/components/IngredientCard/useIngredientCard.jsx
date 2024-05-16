import { useEffect, useState } from "react";
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext";

export function useIngredientCard(label, id, isSelected, bgColor) {
    const {
        ingredients,
        displayedIngredients,
        randomIngredients,
        handleIngredientUpdate,
        handleIngredientsDecrement,
    } = useManageIngredients()

    const [inputValues, setInputValues] = useState({ initial: label, current: label })
    const [cardState, setCardState] = useState({ label, state: isSelected, id, color: bgColor, inputActive: false })
    const [suggestions, setSuggestions] = useState(ingredients)

    useEffect(() => {
        setInputValues(prev => ({ ...prev, current: label }))
        setCardState(prev => ({ ...prev, label, state: isSelected, id, color: bgColor }))
    }, [label, bgColor, isSelected, id, displayedIngredients, randomIngredients])

    useEffect(() => {
        setSuggestions(ingredients)
    }, [ingredients])

    function handleIngredientClick() {
        const newState = !cardState.state
        setCardState(prev => ({ ...prev, state: newState }))
        handleIngredientUpdate(newState, cardState.id)
    }

    function handleInputActivation(e) {
        e.stopPropagation()
        setCardState(prev => ({ ...prev, inputActive: true }))

        if (inputValues.current !== "") {
            setInputValues(prev => ({ ...prev, initial: cardState.label, current: "" }))
            handleIngredientUpdate(false, cardState.id)
        }
    }

    function handleInputChange(e) {
        const inputValue = e.target.value.toUpperCase()
        setInputValues(prev => ({ ...prev, current: inputValue }))
        setSuggestions(ingredients.filter(ingredient => ingredient.name.toUpperCase().includes(inputValue)))
    }

    function handleSuggestionClick(e, id) {
        e.stopPropagation();
        const clickedElement = ingredients.find(ingredient => ingredient.id === id)
        if (!clickedElement.isSelected && !displayedIngredients.some(ingredient => ingredient.id === id)) {
            const { name, id, bgColor } = clickedElement
            setCardState({ label: name, id, state: true, color: bgColor, inputActive: false })
            setInputValues(prev => ({ ...prev, current: name }))
            handleIngredientUpdate(false, cardState.id)
            handleIngredientUpdate(true, id)
        }
    }

    function handleInputDeactivation(e) {
        const inputValue = e.target.value.toUpperCase();
        const isInDatabase = ingredients.filter(ingredient =>
            ingredient.name.toUpperCase().includes(inputValue) && !ingredient.isSelected
        )

        const isInDisplay = displayedIngredients.filter(displayedIngredient =>
            isInDatabase.some(dbIngredient =>
                dbIngredient.id === displayedIngredient.id ||
                dbIngredient.name.toUpperCase() === displayedIngredient.name.toUpperCase()
            )
        )

        const firstAvailableIngredient = isInDatabase.find(ingredient =>
            !isInDisplay.some(displayedIngredient => displayedIngredient.id === ingredient.id)
        )

        if (inputValue !== "" && firstAvailableIngredient) {
            const { name, id, bgColor } = firstAvailableIngredient;
            setCardState({ label: name, id, state: true, color: bgColor, inputActive: false });
            setInputValues(prev => ({ ...prev, current: name }))
            handleIngredientUpdate(true, id);
        } else {
            setInputValues(prev => ({ ...prev, current: prev.initial }))
            setCardState(prev => ({ ...prev, inputActive: false }))
            handleIngredientUpdate(cardState.state, cardState.id)
        }
        setSuggestions(ingredients)
    }

    function handlePressEnter(e) {
        if (e.keyCode === 13) {
            e.target.blur()
        }
    }

    function handleXClick(e) {
        e.stopPropagation()
        if (cardState.inputActive) {
            setInputValues(prev => ({ ...prev, current: "" }))
            setCardState(prev => ({ ...prev, inputActive: false }))
        } else {
            handleIngredientsDecrement(cardState.id, e)
        }
    }

    return {
        handleIngredientClick,
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handleSuggestionClick,
        handlePressEnter,
        handleXClick,
        inputValues,
        setCardState,
        cardState,
        suggestions,
    };
}
