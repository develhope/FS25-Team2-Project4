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
        cuisineEthnicity: [
            "all",
            "italian",
            "french",
            "chinese",
            "japanese",
            "indian",
            "greek",
            "spanish",
            "mexican",
            "thai",
            "middle eastern",
        ],
        preparationTime: 9999,
        caloricApport: 9999,
    })
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [searchFilteredRecipes, setSearchFilteredRecipes] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [recipeAnimation, setRecipeAnimation] = useState(true)

    useEffect(() => {
        setInputValue("")
    }, [location.pathname])

    useEffect(() => {
        setSearchFilteredRecipes(
            filteredRecipes.filter((recipe) => recipe.title.toLowerCase().includes(inputValue.toLowerCase()))
        )
    }, [inputValue])

    //sessionStorage useffect
    useEffect(() => {
        try {
            if (location.pathname === "/recipe") {
                const currentTargetedRecipe = JSON.parse(window.localStorage.getItem("targetedRecipe"))
                currentTargetedRecipe && setTargetedRecipe(currentTargetedRecipe)
            }
            const sessionRecipes = JSON.parse(window.sessionStorage.getItem("recipes"))
            const sessionFilter = JSON.parse(window.sessionStorage.getItem("recipeFilter"))
            if (sessionRecipes && sessionRecipes.length > 0) {
                setRecipes(sessionRecipes)
                setFilteredRecipes(sessionRecipes)
                setSearchFilteredRecipes(sessionRecipes)
            } else {
                setRecipes(recipesArray)
                setFilteredRecipes(recipesArray)
                setSearchFilteredRecipes(recipesArray)
            }
            sessionFilter && setRecipeFilter(sessionFilter)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        try {
            if (recipes && recipes.length > 0) {
                const jsonRecipes = JSON.stringify(recipes)
                window.sessionStorage.setItem("recipes", jsonRecipes)
            }
        } catch (error) {
            console.error(error)
        }
    }, [recipes])

    useEffect(() => {
        try {
            setTimeout(() => {
                const jsonFilter = JSON.stringify(recipeFilter)
                window.sessionStorage.setItem("recipeFilter", jsonFilter)
            }, 0)
        } catch (error) {
            console.error(error)
        }

        //animazoni card quando si cambiano i filtr
        if (recipeAnimation) {
            setTimeout(() => {
                setRecipeAnimation(false)
            }, 0)
        }
        setTimeout(() => {
            setRecipeAnimation(true)
        }, 300)
    }, [recipeFilter])

    useEffect(() => {
        let filtering = recipes.filter(
            (recipe) =>
                recipe.caloricApport <= recipeFilter.caloricApport && recipe.preparationTime <= recipeFilter.preparationTime
        )
        if (recipeFilter.isGlutenFree) {
            filtering = filtering.filter((item) => item.isGlutenFree)
        }
        if (recipeFilter.isVegetarian) {
            filtering = filtering.filter((item) => item.isVegetarian)
        }
        if (recipeFilter.isVegan) {
            filtering = filtering.filter((item) => item.isVegan)
        }
        if (recipeFilter.cuisineEthnicity.find((cuisine) => cuisine === "all")) {
        } else {
            filtering = filtering.filter((item) =>
                recipeFilter.cuisineEthnicity.some((cuisine) => {
                    return cuisine.toLowerCase() === item.cuisineEthnicity.toLowerCase()
                })
            )
        }

        setFilteredRecipes(filtering)
        setSearchFilteredRecipes(filtering)
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
        }, 150)
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
            console.error(error)
        }
    }

    const handlePreferencesToggle = (filterType, value, handleSelected, selectedState) => {
        if (filterType === "caloricApport" || filterType === "preparationTime") {
            if (!selectedState) {
                setRecipeFilter((prevData) => ({
                    ...prevData,
                    [filterType]: value,
                }))
            } else {
                setRecipeFilter((prevData) => ({
                    ...prevData,
                    [filterType]: 9999,
                }))
            }
        }
        if (filterType === "cuisineEthnicity") {
            let updatedEthnicity = [...recipeFilter.cuisineEthnicity] // Copia l'array originale
            const alreadyThere = updatedEthnicity.find((cuisine) => cuisine.toLowerCase() === value)
            if (value === "all") {
                if (recipeFilter.cuisineEthnicity.find((cuisine) => cuisine === "all")) {
                    updatedEthnicity = []
                    handleSelected(false)
                } else {
                    updatedEthnicity = [
                        "all",
                        "italian",
                        "french",
                        "chinese",
                        "japanese",
                        "indian",
                        "greek",
                        "spanish",
                        "mexican",
                        "thai",
                        "middle eastern",
                    ]
                    handleSelected(true)
                }
            } else {
                // Rimuovi l'elemento se è presente
                if (alreadyThere) {
                    updatedEthnicity = updatedEthnicity.filter((item) => item !== value.toLowerCase() && item !== "all")
                    handleSelected && handleSelected(false)
                } else {
                    // Aggiungi l'elemento se non è presente
                    updatedEthnicity.push(value.toLowerCase())
                    if (updatedEthnicity.length === 10) {
                        updatedEthnicity.push("all")
                    }
                }
            }

            // Aggiorna lo stato con il nuovo array
            setRecipeFilter((prevData) => ({
                ...prevData,
                cuisineEthnicity: updatedEthnicity,
            }))
        }
    }

    const handleDeselectRecipeFilters = () => {
        setRecipeFilter({
            isVegetarian: false,
            isGlutenFree: false,
            isVegan: false,
            cuisineEthnicity: [
                "all",
                "italian",
                "french",
                "chinese",
                "japanese",
                "indian",
                "greek",
                "spanish",
                "mexican",
                "thai",
                "middle eastern",
            ],
            preparationTime: 9999,
            caloricApport: 9999,
        })
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
                recipeAnimation,
                setRecipes,
                setTargetedRecipe,
                handleRecipesUpdate,
                handleTargetedRecipe,
                toggleRecipeFilter,
                setInputValue,
                handlePreferencesToggle,
                handleDeselectRecipeFilters,
            }}
        >
            {children}
        </RecipesContext.Provider>
    )
}

export const useRecipesContext = () => {
    return useContext(RecipesContext)
}
