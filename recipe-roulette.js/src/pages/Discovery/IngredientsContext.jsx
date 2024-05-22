import { useState, useEffect, createContext, useContext } from "react"
import { useLocation } from "react-router-dom"
import ingredientsArray from "../../assets/ingredientsArray"

const IngredientsContext = createContext()

export const IngredientsProvider = ({ children }) => {
    const [ing, setIng] = useState(ingredientsArray)
    const [ingNum, setIngNum] = useState(5)
    const [slots, setSlots] = useState(ingNum)
    const [displayedIng, setDisplayedIng] = useState([])
    const [selectedIng, setSelectedIng] = useState([])
    const [blackList, setBlackList] = useState([])
    const [randomIng, setRandomIng] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [filter, setFilter] = useState({ isVegetarian: false, isGlutenFree: false, isVegan: false })
    const location = useLocation()

    useEffect(() => {
        selectToDisplay()
    }, [ingNum, location.key, filter, refresh])

    const toggleFilter = (prop, setState) => {
        const newState = !filter[prop]
        setFilter((prevData) => ({ ...prevData, [prop]: newState }))
        setState(newState)
    }

    const handleIngUpdate = (prop, cardState, setCardState) => {
        const updatedIngs = ing.map((item) => (item.id === cardState.id ? { ...item, [prop]: !cardState[prop] } : item))
        setIng(updatedIngs)

        const affectedIngs = updatedIngs.filter((item) => item[prop])
        if (prop === "isSelected") {
            setSelectedIng(affectedIngs)
            if (affectedIngs.length > ingNum) {
                setIngNum(affectedIngs.length)
            }
            setSlots(ingNum - affectedIngs.length)
        } else if (prop === "isBlackListed") {
            setBlackList(affectedIngs)
        }

        setCardState((prevState) => ({
            ...prevState,
            ...updatedIngs.find((item) => item.id === cardState.id),
        }))
    }

    const handleDeselectAll = (prop, setCardState, setFilterState) => {
        if (prop === "isSelected" && selectedIng.length > 0) {
            setSelectedIng([])
            setSlots(ingNum)
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

    const selectToDisplay = () => {
        let availableIngs = ing.filter((item) => !item.isSelected && !item.isBlackListed)

        if (filter.isGlutenFree) {
            availableIngs = availableIngs.filter((item) => item.isGlutenFree)
        }
        if (filter.isVegetarian) {
            availableIngs = availableIngs.filter((item) => item.isVegetarian)
        }
        if (filter.isVegan) {
            availableIngs = availableIngs.filter((item) => item.isVegan)
        }

        const ingredientIds = availableIngs.filter((item) => !item.isSelected && !item.isBlackListed).map((item) => item.id)
        const selectedIds = selectedIng.map((item) => item.id)
        const randomIds = []

        while (randomIds.length < slots) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (!randomIds.includes(randomId) && !selectedIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }
        const newRandomIng = ing.filter((item) => randomIds.includes(item.id))
        setRandomIng(newRandomIng)
        setDisplayedIng([...selectedIng, ...newRandomIng])
    }

    const shuffleIng = () => {
        selectToDisplay()
    }

    const handleIngIncrement = () => {
        if (ingNum < 8) {
            setIngNum((prev) => prev + 1)
            setSlots((prev) => prev + 1)
        }
    }

    const handleIngDecrement = (id, e) => {
        e.stopPropagation()
        if (ingNum > 3 && !ing.find((item) => item.id === id).isSelected) {
            setIngNum((prev) => prev - 1)
            setSlots((prev) => prev - 1)
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
                selectToDisplay,
                setRefresh,
                toggleFilter,
                ing,
                ingNum,
                randomIng,
                selectedIng,
                displayedIng,
                blackList,
                filter,
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
