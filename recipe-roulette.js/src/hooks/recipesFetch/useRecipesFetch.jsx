import axios from "axios"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useState } from "react"

export function useRecipesFetch() {
    const [state, setState] = useState({
        error: false,
        loading: true,
    })
    const { setSearchFilteredRecipes } = useRecipesContext()

    const handleRecipesFetch = async (ingredients, prepTime, caloricApport, cuisineEthnicity) => {
        setState({error: false, loading: true })

        console.log(ingredients, prepTime, caloricApport, cuisineEthnicity)
        try {
            const response = await axios.post("http://localhost:3000/api/generate-recipes", {
                ingredients,
                prepTime,
                caloricApport,
                cuisineEthnicity,
            })

            const parsedData = JSON.parse(response.data)
            console.log(parsedData);
            setSearchFilteredRecipes(parsedData?.meals)
            setState({ loading: false, error: false })
            setTimeout(() => {
                console.log(state)
            }, 1000)
        } catch (error) {
            console.error("An error occurred while fetching recipes:", error)
            setState({ error: true, loading: false })
        }
    }

    return { handleRecipesFetch, state }
}
