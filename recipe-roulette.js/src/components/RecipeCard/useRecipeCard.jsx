import { useEffect, useState } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/Auth/useAuth"

export function useRecipeCard(recipe, isExpanded) {
    const [cardState, setCardState] = useState(recipe)
    const [expandedCard, setExpandedCard] = useState(isExpanded)
    const [expandedIngredients, setExpandedIngredients] = useState(true)
    const { handleRecipesUpdate, setRecipes } = useRecipesContext()
    const location = useLocation()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        setCardState((prevState) => ({ ...prevState, isFavorited: recipe.isFavorited, id: recipe.id }))
    }, [recipe.isFavorited, recipe.id, isAuthenticated])

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
            const updatedRecipes = {
                ...prev,
                targetedRecipe: recipe,
            }

            // Salva le ricette aggiornate nel local storage
            try {
                const jsonRecipes = JSON.stringify(updatedRecipes)
                localStorage.setItem("recipes", jsonRecipes)
            } catch (error) {
                console.error("Failed to save recipes to local storage:", error)
            }

            return updatedRecipes
        })

        // Naviga alla pagina della ricetta
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
