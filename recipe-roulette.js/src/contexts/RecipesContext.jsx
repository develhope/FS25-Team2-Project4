import { createContext, useContext, useEffect, useMemo, useState } from "react"
import recipesArray from "../assets/recipes/recipes"

const RecipesContext = createContext()

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([])
    const [targetedRecipe, setTargetedRecipe] = useState()
    const [recipeFilter, setRecipeFilter] = useState({
        isVegetarian: false,
        isGlutenFree: false,
        isVegan: false,
        cuisineEthnicity: [],
    })
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [searchFilteredRecipes, setSeatchFilteredRecipes] = useState([])
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        setInputValue("")
    }, [location.pathname])

    useEffect(() => {
        setSeatchFilteredRecipes(filteredRecipes.filter((recipe) => recipe.title.toLowerCase().includes(inputValue.toLowerCase())))
    }, [inputValue, filteredRecipes])

    //localstorage useeffect
    useEffect(() => {
        try {
            const currentTargetedRecipe = JSON.parse(window.localStorage.getItem("targetedRecipe"))
            const localRecipes = JSON.parse(window.localStorage.getItem("recipes"))
            if (localRecipes && localRecipes.length > 0) {
                setRecipes(localRecipes)
                setFilteredRecipes(localRecipes)
                setSeatchFilteredRecipes(localRecipes)
            } else {
                setRecipes(recipesArray)
                setFilteredRecipes(recipesArray)
                setSeatchFilteredRecipes(recipesArray)
            }
            if (currentTargetedRecipe) {
                setTargetedRecipe(currentTargetedRecipe)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        try {
            if (recipes && recipes.length > 0) {
                const jsonRecipes = JSON.stringify(recipes)
                window.localStorage.setItem("recipes", jsonRecipes)
            }
        } catch (error) {
            console.log(error)
        }
    }, [recipes])

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
        /* //da verificare  se funziona questa parte
        if (recipeFilter.cuisineEthnicity.length > 0) {
            filtering = recipes.filter((item) => {
                if (item.cuisineEthnicity.length > 0) {
                    return recipeFilter.cuisineEthnicity.some((cousine) => cousine === item.cuisineEthnicity)
                } else {
                    return item
                }
            })
        } */
        console.log(filtering);
        setFilteredRecipes(filtering)
    }, [recipeFilter, recipes])

    const toggleRecipeFilter = (prop) => {
        const newState = !recipeFilter[prop]
        setRecipeFilter((prevData) => ({ ...prevData, [prop]: newState }))
    }

    const handleRecipesUpdate = (recipeState, setRecipeState) => {
        const updatedRecipes = recipes.map((recipe) => {
            return recipe.id === recipeState.id ? { ...recipe, isFavorited: !recipeState.isFavorited } : recipe
        })
        const updatedRecipe = updatedRecipes.find((recipe) => recipe.id === recipeState.id)
        //guarda qui in caso di bug
        setTimeout(() => {
            setRecipes(updatedRecipes)
            setFilteredRecipes(updatedRecipes)
        }, 300)
        setRecipeState((prevData) => {
            return {
                ...prevData,
                isFavorited: updatedRecipe.isFavorited,
            }
        })
    }

    const handleTargetedRecipe = (recipeState) => {
        const currentTargetedRecipe = recipes.find((recipe) => recipe.id === recipeState.id)
        setTargetedRecipe(currentTargetedRecipe)
        try {
            const jsonTargetedRecipe = JSON.stringify(currentTargetedRecipe)
            window.localStorage.setItem("targetedRecipe", jsonTargetedRecipe)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                filteredRecipes,
                targetedRecipe,
                recipeFilter,
                inputValue,
                searchFilteredRecipes,
                setRecipes,
                setTargetedRecipe,
                handleRecipesUpdate,
                handleTargetedRecipe,
                toggleRecipeFilter,
                setInputValue,
            }}
        >
            {children}
        </RecipesContext.Provider>
    )
}

export const useRecipesContext = () => {
    return useContext(RecipesContext)
}
