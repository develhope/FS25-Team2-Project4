import { useEffect, useState } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useNavigate } from "react-router-dom"

export function useRecipeCard(recipeId, isFav, isExpanded) {
    const [cardState, setCardState] = useState({
        id: recipeId,
        isFavorited: isFav,
    })
    const [expandedCard, setExpandedCard] = useState(isExpanded)
    const [expandedIngredients, setExpandedIngredients] = useState(true)
    const { handleRecipesUpdate, handleTargetedRecipe } = useRecipesContext()
    const navigate = useNavigate()

    useEffect(() => {
        setCardState((prevState) => ({ ...prevState, isFavorited: isFav }))
    }, [isFav])

    function handleCardState(e) {
        e.preventDefault()
        e.stopPropagation()
        handleRecipesUpdate(cardState, setCardState)
    }

    function handleIngWrapperState(e) {
        e.stopPropagation()
        e.preventDefault()
        setExpandedIngredients((b) => !b)
    }

    function handleOpenRecipePage() {
        handleTargetedRecipe(cardState)
        navigate("/recipe")
    }

    return {
        cardState,
        expandedCard,
        expandedIngredients,
        handleIngWrapperState,
        handleCardState,
        handleOpenRecipePage,
    }
}
