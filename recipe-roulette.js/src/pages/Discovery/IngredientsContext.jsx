import { useState, useEffect, createContext, useContext } from "react"
import ingredients from "../../components/IngredientCard/ingredients"

const IngredientsContext = createContext()

export const IngredientsProvider = ({ children }) => {
    const [ingredientsArr, setIngredientsArr] = useState(ingredients)
    const [initialValue, setInitialValue] = useState(5)
    const [slots, setSlots] = useState(initialValue)
    const [displayedIngredients, setDisplayedIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [randomIngredients, setRandomIngredients] = useState([])
    const [blackList, setBlackList] = useState([])

    useEffect(() => {
        selectToDisplay(ingredientsArr, slots)
    }, [initialValue])

    useEffect(() => {
        setDisplayedIngredients([...selectedIngredients, ...randomIngredients])
    }, [randomIngredients])

    const handleIngredientUpdate = (selectState, itemId) => {
        const updatedIngredients = ingredientsArr.map((ingredient) =>
            ingredient.id === itemId ? { ...ingredient, isSelected: selectState } : ingredient
        )
        setIngredientsArr(updatedIngredients)

        const newSelectedIngredients = updatedIngredients.filter(
            (ingredient) => ingredient.isSelected
        )
        setSelectedIngredients(newSelectedIngredients)

        /*         const updatedRandomIngredients = randomIngredients.map((randomIngredient) => {
            const updatedIngredient = updatedIngredients.find(
                (ingredient) => ingredient.id === randomIngredient.id
            )
            return updatedIngredient || randomIngredient
        })

        const newRandomIngredients = updatedRandomIngredients.filter(
            (ingredient) => !ingredient.isSelected
        ) */

        const newSlots = initialValue - newSelectedIngredients.length
        setSlots(newSlots)

        /*         return [...newSelectedIngredients, ...newRandomIngredients]
         */
    }

    const handleDeselectAll = () => {
        setSelectedIngredients([])
        setIngredientsArr((prevData) =>
            prevData.map((ingredient) => ({ ...ingredient, isSelected: false }))
        )
        setDisplayedIngredients(
            displayedIngredients.map((ingredient) => ({ ...ingredient, isSelected: false }))
        )
        setSlots(initialValue)
    }

    const handleBlackListUpdate = (state, itemId) => {
        const updatedIngredients = ingredientsArr.map((ingredient) =>
            ingredient.id === itemId ? { ...ingredient, isBlackListed: state } : ingredient
        )
        setIngredientsArr(updatedIngredients)
        const newBlackListedIngredients = updatedIngredients.filter(
            (ingredient) => ingredient.isBlackListed
        )

        setBlackList(newBlackListedIngredients)
    }

    const handleBlackListReset = ()=>  {
        setIngredientsArr(ingredientsArr.map(ing => ({...ing, isBlackListed: false})))
        setBlackList([])
    }

    const selectToDisplay = (ingredientsArr, slots) => {
        const ingredientIds = ingredientsArr
            .filter((ingredient) => !ingredient.isSelected)
            .map((ingredient) => ingredient.id)
        const selectedIds = selectedIngredients.map((ingredient) => ingredient.id)
        const randomIds = []

        while (randomIds.length < slots) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (!randomIds.includes(randomId) && !selectedIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }

        const newRandomIngredients = ingredientsArr.filter((ingredient) =>
            randomIds.includes(ingredient.id)
        )
        setRandomIngredients(newRandomIngredients)
    }

    const shuffleIngredients = () => {
        selectToDisplay(ingredientsArr, slots)
    }

    const handleIngredientsIncrement = () => {
        if (initialValue < 8) {
            setInitialValue((prev) => prev + 1)
            setSlots((prev) => prev + 1)
        }
    }

    const handleIngredientsDecrement = (id, e) => {
        const isTargetSelected = ingredientsArr.find((ingredient) => ingredient.id === id)
        e.stopPropagation()
        if (initialValue > 3 && !isTargetSelected.isSelected) {
            setInitialValue((prev) => prev - 1)
            setSlots((prev) => prev - 1)
        }
    }

    return (
        <IngredientsContext.Provider
            value={{
                selectedIngredients,
                displayedIngredients,
                setDisplayedIngredients,
                shuffleIngredients,
                handleIngredientUpdate,
                ingredients: ingredientsArr,
                handleIngredientsIncrement,
                handleIngredientsDecrement,
                handleDeselectAll,
                blackList,
                setBlackList,
                handleBlackListUpdate,
                handleBlackListReset,
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
