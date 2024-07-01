import { useState, useEffect, createContext, useContext } from "react"
import ingredientsArray from "../../assets/ingredientsArray"

const IngredientsContext = createContext()

export const IngredientsProvider = ({ children }) => {
    const [ing, setIng] = useState(ingredientsArray)
    const [displayedIng, setDisplayedIng] = useState([])
    const [blackList, setBlackList] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [filter, setFilter] = useState({ isVegetarian: false, isGlutenFree: false, isVegan: false })
    const [filteredIng, setFilteredIng] = useState(ing)

    useEffect(() => {
        try {
            const sessionFilters = JSON.parse(window.sessionStorage.getItem("filters"))
            const sessionDisplayedIng = JSON.parse(window.sessionStorage.getItem("displayedIng"))
            const sessionIng = JSON.parse(window.sessionStorage.getItem("ing"))
            sessionFilters && setFilter(sessionFilters)
            if (sessionIng && sessionIng.length > 0) {
                setIng(sessionIng)
                setBlackList(sessionIng.filter((ing) => ing.isBlackListed))
            } else {
                setIng(ingredientsArray)
            }
            if (sessionDisplayedIng && sessionDisplayedIng.length > 0) {
                setDisplayedIng(sessionDisplayedIng)
            } else {
                generateIngredients()
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        try {
            if (displayedIng.length > 0) {
                const jsonDisplayedIngs = JSON.stringify(displayedIng)
                window.sessionStorage.setItem("displayedIng", jsonDisplayedIngs)
            }
        } catch (error) {
            console.error(error)
        }
    }, [displayedIng])

    useEffect(() => {
        setTimeout(() => {
            const jsonIngs = JSON.stringify(ing)
            const jsonFilters = JSON.stringify(filter)
            window.sessionStorage.setItem("ing", jsonIngs)
            window.sessionStorage.setItem("filters", jsonFilters)
        }, 0)

        if (filteredIng) {
            setFilteredIng(() => {
                let newData = ing
                if (filter.isGlutenFree) {
                    newData = newData.filter((item) => item.isGlutenFree)
                }
                if (filter.isVegetarian) {
                    newData = newData.filter((item) => item.isVegetarian)
                }
                if (filter.isVegan) {
                    newData = newData.filter((item) => item.isVegan)
                }
                return newData
            })
        }
    }, [filter, displayedIng, ing])

    const toggleFilter = (prop) => {
        const newState = !filter[prop]
        setFilter((prevData) => ({ ...prevData, [prop]: newState }))
    }

    const handleIngUpdate = (prop, cardState, setCardState) => {
        const updatedIngs = ing.map((item) => (item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item))
        const updatedDisplayedIngs = displayedIng.map((item) =>
            item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item
        )
        const isDisplayed = displayedIng.some((ingredient) => ingredient.id === cardState.id)
        const updatedIng = updatedIngs.find((ingredient) => ingredient.id === cardState.id)

        setIng(updatedIngs)
        if (prop === "isSelected") {
            if (isDisplayed) {
                setDisplayedIng(updatedDisplayedIngs)
            } else {
                if (displayedIng.length === 8) {
                    setDisplayedIng((prevData) => {
                        let firstUnselected = true
                        const newData = []
                        prevData.forEach((ingredient) => {
                            if (!ingredient.isSelected && firstUnselected) {
                                newData.push(updatedIng)
                                firstUnselected = false
                            } else {
                                newData.push(ingredient)
                            }
                        })
                        return newData
                    })
                } else {
                    setDisplayedIng((prevData) => [updatedIng, ...prevData])
                }
            }
        }
        const newBlacklistedIngs = updatedIngs.filter((item) => item[prop])
        if (prop === "isBlackListed") {
            setBlackList(newBlacklistedIngs)
            setDisplayedIng(updatedDisplayedIngs)
        }
        if (setCardState) {
            setCardState((prevState) => ({
                ...prevState,
                ...updatedIng,
            }))
        }
    }

    const handleDeselectAll = (prop, setCardState, setFilterState) => {
        const selectedIng = displayedIng.filter((ing) => ing.isSelected)
        if (prop === "isSelected" && selectedIng.length > 0) {
            setDisplayedIng((prevData) => prevData.map((ing) => ({ ...ing, [prop]: false })))
        } else if (prop === "isBlackListed") {
            setBlackList([])
            setFilter({ isGlutenFree: false, isVegan: false, isVegetarian: false })
        }
        setIng((prevData) => prevData.map((ing) => ({ ...ing, [prop]: false })))
        if (setFilterState) {
            setFilterState((prevData) => ({ ...prevData, [prop]: false }))
        }
        if (setCardState) {
            setCardState((prevData) => ({ ...prevData, [prop]: false }))
        }
    }
    const handleDeselectPreferences = (prop, setCardState, setFilterState) => {
        if (prop === "isBlackListed") {
            setFilter({ isGlutenFree: false, isVegan: false, isVegetarian: false })
        }
        if (setFilterState) {
            setFilterState((prevData) => ({ ...prevData, [prop]: false }))
        }
    }

    const generateIngredients = () => {
        const ingredientIds = filteredIng
            .filter((ingredient) => !ingredient.isSelected && !ingredient.isBlackListed)
            .map((item) => item.id)
        const randomIds = []

        while (randomIds.length < 5) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (!randomIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }
        const randomIng = filteredIng.filter((item) => randomIds.includes(item.id))
        setDisplayedIng([...randomIng])
    }

    const swapIngredient = () => {
        setDisplayedIng((prevData) => {
            const newData = []
            let availableIngs = filteredIng.filter((item) => !item.isSelected && !item.isBlackListed)
            prevData.forEach((ingredient) => {
                if (!ingredient.isSelected) {
                    const ingredientIds = availableIngs.map((item) => item.id)
                    let newRandomIng = null
                    while (!newRandomIng) {
                        const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
                        const isUnique = prevData.find((ingredient) => ingredient.id === randomId)
                        if (ingredient.id !== randomId && !isUnique) {
                            newRandomIng = ing.find((item) => item.id === randomId)
                            newData.push(newRandomIng)
                            availableIngs = availableIngs.filter((ingredient) => ingredient.id !== newRandomIng.id)
                        }
                    }
                } else {
                    newData.push(ingredient)
                }
            })
            return newData
        })
    }

    const shuffleIng = () => {
        swapIngredient()
    }

    const handleIngIncrement = () => {
        const availableIngs = filteredIng.filter((ingredient) => !ingredient.isSelected && !ingredient.isBlackListed)
        if (displayedIng.length < 8) {
            displayedIng.forEach((ingB) => {
                availableIngs.forEach((ingA, index) => {
                    if (ingA.id === ingB.id) {
                        availableIngs.splice(index, 1)
                    }
                })
            })
            const newIng = availableIngs.find((ingredient) => ingredient)
            setDisplayedIng((prevData) => [...prevData, newIng])
        }
    }

    const handleIngDecrement = (id, e) => {
        e.stopPropagation()
        if (displayedIng.length > 3) {
            setDisplayedIng((prevData) => prevData.filter((ingredient) => ingredient.id !== id))
        }
    }

    return (
        <IngredientsContext.Provider
            value={{
                handleIngIncrement,
                handleIngDecrement,
                handleDeselectAll,
                setDisplayedIng,
                shuffleIng,
                handleIngUpdate,
                setBlackList,
                generateIngredients,
                setRefresh,
                toggleFilter,
                handleDeselectPreferences,
                ing,
                displayedIng,
                blackList,
                filter,
                filteredIng,
            }}
        >
            {children}
        </IngredientsContext.Provider>
    )
}

export const useManageIngredients = () => {
    const context = useContext(IngredientsContext)
    if (!context) {
        throw new Error("useManageIngredients must be used within an IngredientsProvider")
    }
    return context
}
