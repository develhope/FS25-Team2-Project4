import React, { createContext, useContext, useState, useCallback } from "react"
import axios from "axios"
import { useRecipesContext } from "../../contexts/RecipesContext"

// Creazione del contesto
const RecipesFetchContext = createContext()

// Provider del contesto
export const RecipesFetchProvider = ({ children }) => {
    const [state, setState] = useState({
        error: false,
        loading: false,
    })
    const { setRecipes } = useRecipesContext()

    const handleRecipesFetch = useCallback(
        async (ingredients, prepTime, caloricApport, cuisineEthnicity) => {
            setState({ error: false, loading: true })

            console.log(ingredients, prepTime, caloricApport, cuisineEthnicity)
            try {
                const response = await axios.post("http://localhost:3001/api/generate-recipes", {
                    ingredients,
                    prepTime,
                    caloricApport,
                    cuisineEthnicity,
                })

                const parsedData = JSON.parse(response.data)
                console.log(parsedData)

                setRecipes((prev) => {
                    return {
                        ...prev,
                        results: parsedData?.meals,
                        filtered: parsedData?.meals,
                        searched: parsedData?.meals,
                    }
                })
                setState({ loading: false, error: false })
            } catch (error) {
                console.error("An error occurred while fetching recipes:", error)
                setState({ error: true, loading: false })
            }
        },
        [setRecipes]
    )

    return <RecipesFetchContext.Provider value={{ handleRecipesFetch, state }}>{children}</RecipesFetchContext.Provider>
}

// Hook personalizzato per utilizzare il contesto
export const useRecipesFetch = () => {
    return useContext(RecipesFetchContext)
}
