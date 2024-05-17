import { useState, useEffect, createContext, useContext, useMemo } from "react"
import ingredientsArray from "../../assets/ingredientsArray"

const IngredientsContext = createContext()

export const IngredientsProvider = ({ children }) => {
    //all ingredients
    const [ing, setIng] = useState(ingredientsArray)
    //number of ingredients shown
    const [ingNum, setIngNum] = useState(5)
    //number of free slots (ingNum - selectedIngredients)
    const [slots, setSlots] = useState(ingNum)
    //ingredients currently on display
    const [displayedIng, setDisplayedIng] = useState([])
    //ingredients with isSelected & isBlackListed
    const [selectedIng, setSelectedIng] = useState([])
    const [blackList, setBlackList] = useState([])
    //ingredients placed in free slots
    const [randomIng, setRandomIng] = useState([])

    //
    useEffect(() => {
        selectToDisplay()
    }, [ingNum])

    useEffect(() => {
        setDisplayedIng([...selectedIng, ...randomIng])
    }, [randomIng])
    //

    //(() => {

    const handleIngUpdate = (prop, cardState, setCardState) => {
        {
            let updatedIngredient = null
            console.log("cardstate", cardState)
            // Mappare gli ingredienti per aggiornare lo stato dell'ingrediente selezionato
            const updatedIng = ing.map((item) => {
                if (item.id === cardState.id) {
                    updatedIngredient = { ...item, [prop]: !cardState[prop] }
                    return updatedIngredient
                }
                return item
            })
            // Aggiornare lo stato degli ingredienti
            setIng(updatedIng)

            // Filtrare gli ingredienti in base alla proprietà aggiornata
            const changedIng = updatedIng.filter((item) => item[prop])

            // Gestire l'aggiornamento dello stato in base alla proprietà
            switch (prop) {
                case "isSelected": {
                    setSelectedIng(changedIng)
                    const newSlots = ingNum - changedIng.length
                    setSlots(newSlots)
                    break
                }
                case "isBlackListed": {
                    setBlackList(changedIng)
                    break
                }
                default:
                    break
            }
            console.log("updateding", updatedIngredient, updatedIng)
            // Aggiornare lo stato del componente card
            setCardState((prevState) => ({
                ...prevState,
                id: updatedIngredient.id,
                label: updatedIngredient.label,
                bgColor: updatedIngredient.bgColor,
                isSelected: updatedIngredient.isSelected,
                isBlackListed: updatedIngredient.isBlackListed,
            }))
        }
    }

    //

    //
    function handleDeselectAll(prop, cardState, setCardState) {
        console.log("imrunningg");
        switch (prop) {
            case "isSelected": {
                setSelectedIng([])
                setIng((prevData) => prevData.map((ing) => ({ ...ing, [prop]: false })))
                setDisplayedIng(displayedIng.map((ing) => ({ ...ing, [prop]: false })))
                setSlots(ingNum)
                break
            }
            case "isBlackListed": {
                setBlackList([])
                setIng((prevData) => prevData.map((ing) => ({ ...ing, [prop]: false })))
                break
            }
        }

        setCardState((prevData) => {
            ;({ ...prevData, [prop]: false })
        })
    }
    //

    //
    function selectToDisplay() {
        const ingredientIds = ing
            .filter((ingredient) => !ingredient.isSelected)
            .map((ingredient) => ingredient.id)
        const selectedIds = selectedIng.map((ingredient) => ingredient.id)
        const randomIds = []

        while (randomIds.length < slots) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (!randomIds.includes(randomId) && !selectedIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }

        const newRandomIng = ing.filter((ing) => randomIds.includes(ing.id))
        setRandomIng(newRandomIng)
    }
    //

    //
    function shuffleIng() {
        selectToDisplay()
    }
    //

    //
    function handleIngIncrement() {
        if (ingNum < 8) {
            setIngNum((prev) => prev + 1)
            setSlots((prev) => prev + 1)
        }
    }
    //

    //
    function handleIngDecrement(id, e) {
        const isTargetSelected = ing.find((ingredient) => ingredient.id === id)
        e.stopPropagation()
        if (ingNum > 3 && !isTargetSelected.isSelected) {
            setIngNum((prev) => prev - 1)
            setSlots((prev) => prev - 1)
        }
    }
    //

    //
    return (
        <IngredientsContext.Provider
            value={{
                handleIngIncrement,
                handleIngDecrement,
                handleDeselectAll,
                setDisplayedIng,
                shuffleIng,
                handleIngUpdate,

                ing,
                randomIng,
                selectedIng,
                displayedIng,
                blackList,
            }}
        >
            {children}
        </IngredientsContext.Provider>
    )
}

//non so a che serve questo, messo da ghatGPT
export const useManageIngredients = () => {
    const context = useContext(IngredientsContext)
    if (!context) {
        throw new Error("useManageIngredients must be used within an IngredientsProvider")
    }
    return context
}
