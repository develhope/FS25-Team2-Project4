import { useState } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/Auth/useAuth"

export function useRecipeCard(recipeId, isFav, isExpanded) {
    const [cardState, setCardState] = useState({
        id: recipeId,
        isFavorited: isFav,
    })
    const [expandedCard, setExpandedCard] = useState(isExpanded)
    const [expandedIngredients, setExpandedIngredients] = useState(true)
    const { handleRecipesUpdate, handleTargetedRecipe } = useRecipesContext()
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate()

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
        if (isAuthenticated) {
            navigate("/recipe")
        }
        handleTargetedRecipe(cardState)
    }

    return {
        cardState,
        expandedCard,
        expandedIngredients,
        handleIngWrapperState,
        handleCardState,
        // handleShowFullDetails,
        handleOpenRecipePage,
    }
}
