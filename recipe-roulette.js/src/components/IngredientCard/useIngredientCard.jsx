import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { useSearch } from "../Search/useSearch"

export function useIngredientCard(label, id, isSelected, bgColor) {
    const [cardState, setCardState] = useState({
        label,
        state: isSelected,
        id,
        color: bgColor,
        inputActive: false,
    })
    const { randomIngredients, handleIngredientUpdate, handleIngredientsDecrement } =
        useManageIngredients()

    useEffect(() => {
        setCardState((prev) => ({
            ...prev,
            label,
            state: isSelected,
            id,
            color: bgColor,
        }))
    }, [label, bgColor, isSelected, id, randomIngredients])

    function handleIngredientClick() {
        const newState = !cardState.state
        setCardState((prev) => ({ ...prev, state: newState }))
        handleIngredientUpdate(newState, cardState.id)
    }

    function handleXClick(e) {
        e.stopPropagation()
        if (cardState.state) {
            handleIngredientClick()
        } else {
            handleIngredientsDecrement(cardState.id, e)
        }
    }

    return {
        handleIngredientClick,
        handleXClick,
        cardState,
    }
}
