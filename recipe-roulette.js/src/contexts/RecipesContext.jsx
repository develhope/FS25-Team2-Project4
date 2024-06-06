import { createContext, useContext, useEffect, useMemo, useState } from "react"
import recipesArray from "../assets/recipes/recipes"
import { useLocation } from "react-router-dom"

const RecipesContext = createContext()

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState(recipesArray)
    const [targetedRecipe, setTargetedRecipe] = useState()
    const [recipeFilter, setRecipeFilter] = useState({
        isVegetarian: false,
        isGlutenFree: false,
        isVegan: false,
        cuisineEthnicity: [],
    })
    const [inputValue, setInputValue] = useState("")
    const [filteredRecipes, setFilteredRecipes] = useState(recipesArray)
    const location = useLocation()

    useEffect(() => {
        setInputValue("")
    }, [location.pathname])

    useEffect(() => {
        let filtering = recipes
        if (recipeFilter.isGlutenFree) {
            filtering = filtering.filter((item) => item.isGlutenFree)
        }
        if (recipeFilter.isVegetarian) {
            filtering = filtering.filter((item) => item.isVegetarian)
        }
        if (recipeFilter.isVegan) {
            filtering = filtering.filter((item) => item.isVegan)
        }
        //da verificare  se funziona questa parte
        if (recipeFilter.cuisineEthnicity.length > 0) {
            filtering = recipes.filter((item) => {
                if (item.cuisineEthnicity.length > 0) {
                    return recipeFilter.cuisineEthnicity.some((cousine) => cousine === item.cuisineEthnicity)
                } else {
                    return item
                }
            })
        }
        setFilteredRecipes(
            filtering.filter((recipe) => {
                return recipe.title.toUpperCase().includes(inputValue.toUpperCase())
            })
        )
    }, [inputValue, recipeFilter])

    const toggleRecipeFilter = (prop) => {
        const newState = !recipeFilter[prop]
        setRecipeFilter((prevData) => ({ ...prevData, [prop]: newState }))
    }

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
        <RecipesContext.Provider
            value={{
                recipes,
                filteredRecipes,
                inputValue,
                targetedRecipe,
                recipeFilter,
                setInputValue,
                setRecipes,
                handleRecipesUpdate,
                handleTargetedRecipe,
                toggleRecipeFilter,
            }}
        >
            {children}
        </RecipesContext.Provider>
    )
}

export const useRecipesContext = () => {
    return useContext(RecipesContext)
}
