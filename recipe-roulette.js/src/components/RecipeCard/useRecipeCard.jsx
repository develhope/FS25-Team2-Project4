import { useEffect, useState } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocation, useNavigate } from "react-router-dom"

export function useRecipeCard(recipeId, isFav, isExpanded) {
    const [cardState, setCardState] = useState({
        id: recipeId,
        isFavorited: isFav,
    })
    const [expandedCard, setExpandedCard] = useState(isExpanded)
    const [expandedIngredients, setExpandedIngredients] = useState(true)
    const { handleRecipesUpdate, setRecipes } = useRecipesContext()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setCardState((prevState) => ({ ...prevState, isFavorited: isFav, id: recipeId }))
    }, [isFav, recipeId])

    function handleCardState(e) {
        e.preventDefault()
        e.stopPropagation()
        handleRecipesUpdate(cardState, setCardState, location.pathname)
    }

    function handleIngWrapperState(e) {
        e.stopPropagation()
        e.preventDefault()
        setExpandedIngredients((b) => !b)
    }

    function handleOpenRecipePage(recipe) {
        setRecipes((prev) => {
            return {
                ...prev,
                targetedRecipe: recipe,
            }
        })
        navigate("/recipe")
    }

    return {
        cardState,
        expandedCard,
        expandedIngredients,
        handleIngWrapperState,
        handleCardState,
        handleOpenRecipePage,
        setExpandedCard,
    }
}
