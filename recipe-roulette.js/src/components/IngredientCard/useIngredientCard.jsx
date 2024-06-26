import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { useIngredientSuggestion } from "../Search/Suggestions/useIngredientSuggestion"
import { useSnackbar } from "../Snackbar/useSnackbar"

export function useIngredientCard(ing) {
    //Card State
    const { id, label, bgColor, isBlackListed, isSelected } = ing
    const [cardState, setCardState] = useState({
        label,
        id,
        bgColor,
        isSelected,
        isBlackListed,
    })
    const { ingState } = useIngredientSuggestion(id, label, bgColor, isSelected, isBlackListed)

    //Context Provider stuff
    const { handleIngUpdate, handleIngDecrement, displayedIng, filteredIng } = useManageIngredients()

    //Snackbar
    const { handleOpenSnackbar } = useSnackbar()

    useEffect(() => {
        setCardState({ label, id, bgColor, isSelected, isBlackListed })
    }, [displayedIng])

    useEffect(() => {
        setCardState(ingState)
    }, [ingState])

    function handleIngredientClick() {
        if (cardState.isBlackListed  && !cardState.isSelected ) {
            handleOpenSnackbar("The ingredient is blacklisted!")
        } else if (!filteredIng.find((ing) => ing.id === cardState.id) && !cardState.isSelected) {
            handleOpenSnackbar("You have filtered this type of ingredeints!")
        } else {
            handleIngUpdate("isSelected", cardState, setCardState)
        }
    }

    function handleXClick(e) {
        e.stopPropagation()
        if (cardState.isSelected) {
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
