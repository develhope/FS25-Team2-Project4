import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { useIngredientSuggestion } from "../Search/Suggestions/useIngredientSuggestion"

export function useIngredientCard(id, label, bgColor, isSelected, isBlackListed) {
    //Card State
    const [cardState, setCardState] = useState({
        label,
        id,
        bgColor,
        isSelected,
        isBlackListed,
    })
    const { ingState } = useIngredientSuggestion(id, label, bgColor, isSelected, isBlackListed)

    //Context Provider stuff
    const { handleIngUpdate, handleIngDecrement, randomIng, displayedIng } = useManageIngredients()

    useEffect(() => {
        setCardState({ label, id, bgColor, isSelected, isBlackListed })
    }, [randomIng, displayedIng, ingState])

    function handleIngredientClick() {
        handleIngUpdate("isSelected", cardState, setCardState)
    }

    function handleXClick(e) {
        e.stopPropagation()
        if (cardState.state) {
            handleIngredientClick()
        } else {
            handleIngDecrement(cardState.id, e)
        }
    }

    return {
        handleIngredientClick,
        handleXClick,
        setCardState,
        cardState,
    }
}
