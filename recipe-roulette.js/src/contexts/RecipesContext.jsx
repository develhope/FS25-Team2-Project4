import { createContext, useContext, useState } from "react"
import recipesArray from "../assets/recipes/recipes"

const RecipesContext = createContext()

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState(recipesArray)
    const [targetedRecipe, setTargetedRecipe] = useState()

    const handleRecipesUpdate = (recipeState, setRecipeState) => {
        const updatedRecipes = recipes.map((recipe) => {
            return recipe.id === recipeState.id ? { ...recipe, isFavorited: !recipeState.isFavorited } : recipe
        })
        const updatedRecipe = updatedRecipes.find((recipe) => recipe.id === recipeState.id)
        setRecipes(updatedRecipes)
        setRecipeState((prevData) => {
            return {
                ...prevData,
                isFavorited: updatedRecipe.isFavorited,
            }
        })
    }

    const handleTargetedRecipe = (recipeState) => {
        setTargetedRecipe(recipes.find((recipe) => recipe.id === recipeState.id))
    }

    return (
        <RecipesContext.Provider value={{ recipes, targetedRecipe, setRecipes, handleRecipesUpdate, handleTargetedRecipe }}>
            {children}
        </RecipesContext.Provider>
    )
}

export const useRecipesContext = () => {
    return useContext(RecipesContext)
}
