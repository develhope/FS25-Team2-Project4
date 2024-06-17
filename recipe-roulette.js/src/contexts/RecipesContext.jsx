import recipesArray from "../assets/recipes/recipes"

import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../hooks/Auth/useAuth"

const RecipesContext = createContext()

export const RecipesProvider = ({ children }) => {
    const [recipeFilter, setRecipeFilter] = useState({
        //(si potrebbe creare un costruttore)
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
    }) //filtri di ricerca

    const [recipes, setRecipes] = useState(recipesArray) //fake database
    const [recipesResult, setRecipesResult] = useState([]) //risultati di ricerca
    const [filteredRecipes, setFilteredRecipes] = useState([]) //risultati di ricerca + filtri applicati
    const [searchFilteredRecipes, setSearchFilteredRecipes] = useState([]) //risultati di ricerca + filtri applicati + ricerca per titolo
    const [inputValue, setInputValue] = useState("") //input value che filtra i risultati sopra ^
    const [targetedRecipe, setTargetedRecipe] = useState() // ultima ricetta che è stata aperta
    const [recipeAnimation, setRecipeAnimation] = useState(true) //var di stato per animare le recipeCard quando vengono modificati i filtri
    const location = useLocation()

    const { isAuthenticated } = useAuth()

    useEffect(() => {
        //reset di inputValue quando si cambia pagina
        setInputValue("")
    }, [location.pathname])

    useEffect(() => {
        //impostazione di searchFilteredRecipe (vedi riga 35) quando si digita nel campo di ricerca
        setSearchFilteredRecipes(recipesResult.filter((recipe) => recipe.title.toLowerCase().includes(inputValue.toLowerCase())))
    }, [inputValue])

    //recupero dal localStorage quando si effettua il login o si cambia pagine (non ricordo perché location è nelle dipendenze)
    useEffect(() => {
        try {
            if (location.pathname === "/recipe") {
                const currentTargetedRecipe = JSON.parse(window.localStorage.getItem("targetedRecipe"))
                currentTargetedRecipe && isAuthenticated //se c'è targetedRecipe nel localSorage è si è autenticati
                    ? setTargetedRecipe(currentTargetedRecipe) //imposta quella ricetta in targetedRecipe
                    : setTargetedRecipe({ ...currentTargetedRecipe, isFavorited: false }) //sennò imposta quella ricetta e resetta la proprietà isFavorited a false
            }
            const localRecipes = JSON.parse(window.localStorage.getItem("recipes"))
            const localRecipesResult = JSON.parse(window.localStorage.getItem("recipesResult"))
            const sessionFilter = JSON.parse(window.localStorage.getItem("recipeFilter"))
            const authToken = JSON.parse(window.localStorage.getItem("authToken"))
            if (authToken) {
                // se si è loggati prendi dal localStorage (fake database) i dati salvati
                if (localRecipes && localRecipes.length > 0) {
                    setRecipes(localRecipes) //fake database
                    setFilteredRecipes(localRecipes)
                }
            } else {
                //senno prendi i dati iniziali
                setRecipes(recipesArray) //fake database
                setFilteredRecipes(recipesArray)
            }
            if (localRecipesResult && localRecipesResult.length > 0) {
                //se ci sono risultati di ricerca nel localStorage,
                if (authToken) {
                    //e si è autenticati, imposta quei risultati
                    setRecipesResult(localRecipesResult)
                    setFilteredRecipes(localRecipesResult)
                } else {
                    //se non si è autenticati, resetta tutte le preferenze ed imposta quei risultati
                    setRecipesResult(localRecipesResult.map((recipe) => ({ ...recipe, isFavorited: false })))
                    setFilteredRecipes(localRecipesResult.map((recipe) => ({ ...recipe, isFavorited: false })))
                }
            }
            sessionFilter && setRecipeFilter(sessionFilter) //se ci sono filtri impostati nel sessionStorage, impostali (anche se non si è autenticati)
        } catch (error) {
            console.error(error)
        }
    }, [location, isAuthenticated])

    //impostazione del localStorage quando vengono aggiunte ricette ai preferiti
    useEffect(() => {
        //controlla se si è loggati (authToken presente nel localStorage)
        const authToken = JSON.parse(window.localStorage.getItem("authToken"))
        try {
            //se si è loggati aggiorniamo le ricette salvate nel localStorage (preferiti aggiunti)
            if (recipes && recipes.length > 0 && authToken) {
                const jsonRecipesResult = JSON.stringify(recipesResult)
                const jsonRecipes = JSON.stringify(recipes)
                window.localStorage.setItem("recipes", jsonRecipes)
                window.localStorage.setItem("recipesResult", jsonRecipesResult)
                console.log("recipes localStorage updated") //messaggio di conferma
            }
        } catch (error) {
            console.error(error)
        }
    }, [recipes, recipesResult])

    //salvataggio dei filtri nel localStorage quando vengono modificati, + animazione recipeCard
    useEffect(() => {
        try {
            setTimeout(() => {
                const jsonFilter = JSON.stringify(recipeFilter)
                window.sessionStorage.setItem("recipeFilter", jsonFilter)
            }, 0)
        } catch (error) {
            console.error(error)
        }

        //animazoni recipeCard
        recipeAnimation && setTimeout(() => setRecipeAnimation(false), 0) // se è già in corso, resetta
        setTimeout(() => setRecipeAnimation(true), 300)
    }, [recipeFilter])

    //aggiornamento ricette visualizzate quando vengono modificati i filtri o aggiunti preferiti
    useEffect(() => {
        let filtering = recipesResult.filter(
            (
                recipe //filtra in base ad apporto calorico e tempo di preparazione selezionato
            ) => recipe.caloricApport <= recipeFilter.caloricApport && recipe.preparationTime <= recipeFilter.preparationTime
        ) //filtra in base alle preferenze selezionate
        recipeFilter.isGlutenFree && (filtering = filtering.filter((item) => item.isGlutenFree))
        recipeFilter.isVegetarian && (filtering = filtering.filter((item) => item.isVegetarian))
        recipeFilter.isVegan && (filtering = filtering.filter((item) => item.isVegan))

        if (!recipeFilter.cuisineEthnicity.find((cuisine) => cuisine === "all")) {
            //se non è selezionato "all"
            filtering = filtering.filter(
                (
                    item //filtra in base ai tipi di cucina selezionati
                ) =>
                    recipeFilter.cuisineEthnicity.some((cuisine) => {
                        return cuisine.toLowerCase() === item.cuisineEthnicity.toLowerCase()
                    })
            )
        }

        setFilteredRecipes(filtering)
        setSearchFilteredRecipes(filtering)
    }, [recipesResult, recipeFilter])

    // cerca ricette che possiedono tutti gli ingredienti selezionati nella pagina "roulette"
    const searchRecipeByIng = (displayedIng) => {
        const matchingRecipes = recipes.filter((recipe) =>
            displayedIng.every((ing) => recipe.ingredients.includes(ing.name.toLowerCase()))
        )
        // Imposta il risultato filtrato delle ricette
        setRecipesResult(matchingRecipes)
    }

    // gestione di aggiunta / rimozione di ricette dai preferiti
    const handleRecipesUpdate = (recipeState, setRecipeState) => {
        const updatedRecipes = recipes.map((recipe) => {
            return recipe.id === recipeState.id ? { ...recipe, isFavorited: !recipeState.isFavorited } : recipe
        })
        const updatedRecipesResult = recipesResult.map((recipe) => {
            return recipe.id === recipeState.id ? { ...recipe, isFavorited: !recipeState.isFavorited } : recipe
        })
        const updatedRecipe = updatedRecipes.find((recipe) => recipe.id === recipeState.id)

        //guarda qui in caso di bug (ritardo dell'update, in modo che venga visualizzata prima l'animazione del cuoricino, e poi scompaia la card dalla pagina favorited)
        setTimeout(() => {
            setRecipes(updatedRecipes)
            setRecipesResult(updatedRecipesResult)
        }, 150)
        setRecipeState((prevData) => {
            return {
                ...prevData,
                isFavorited: updatedRecipe.isFavorited,
            }
        })
    }

    // imposta l'ultima ricetta aperta nel localStorage e nella variabile di stato targetedRecipe
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

    // gestione delle proprietà booleane di recipeFilter
    const toggleRecipeFilter = (prop) => {
        const newState = !recipeFilter[prop]
        setRecipeFilter((prevData) => ({ ...prevData, [prop]: newState }))
    }

    // gestione delle proprietà non booleane di recipeFilter
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
        // gestione della proprietà cuisineEthnicity di recipeFilter
        if (filterType === "cuisineEthnicity") {
            let updatedEthnicity = [...recipeFilter.cuisineEthnicity] // Copia l'array originale
            const alreadyThere = updatedEthnicity.find((cuisine) => cuisine.toLowerCase() === value)

            if (value === "all") {
                // se il target è all
                // ed è già selezionato
                if (recipeFilter.cuisineEthnicity.find((cuisine) => cuisine === "all")) {
                    updatedEthnicity = [] // allora deseleziona tutti
                    handleSelected(false) //e imposta lo stato della chip a "non selezionata"
                // se non è gia selezionato, allora seleziona tutti
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
                    handleSelected(true) // e imposta lo stato della chip a "selezionato"
                }
            } else { // il target non è all, ma una delle altre chips
                // Rimuovi l'elemento se è presente
                if (alreadyThere) {
                    updatedEthnicity = updatedEthnicity.filter((item) => item !== value.toLowerCase() && item !== "all")
                    handleSelected && handleSelected(false)
                // Aggiungi l'elemento se non è presente
                } else {
                    updatedEthnicity.push(value.toLowerCase())
                    // se l'array di preferenze ha lunghezza 10 (tutte le chip selezionate tranne "all")
                    if (updatedEthnicity.length === 10) {
                        //seleziona anche "all"
                        updatedEthnicity.push("all")
                    }
                }
            }

            // Alla fine, aggiorna lo stato con il nuovo array
            setRecipeFilter((prevData) => ({
                ...prevData,
                cuisineEthnicity: updatedEthnicity,
            }))
        }
    }

    // reset dei filtri recipeFilter
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
                recipesResult,
                setRecipes,
                setTargetedRecipe,
                handleRecipesUpdate,
                handleTargetedRecipe,
                toggleRecipeFilter,
                setInputValue,
                handlePreferencesToggle,
                handleDeselectRecipeFilters,
                searchRecipeByIng,
            }}
        >
            {children}
        </RecipesContext.Provider>
    )
}

export const useRecipesContext = () => {
    return useContext(RecipesContext)
}
