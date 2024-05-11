import { useState, useEffect, createContext, useContext } from "react"
import ingredients from "../../components/IngredientCard/ingredients"
import Discovery from "./Discovery"

const IngredientsContext = createContext()

export const IngredientsProvider = ({ children }) => {
    const [ingredientsArr, setIngredientsArr] = useState(ingredients)
    const [slots, setSlots] = useState(5)
    const [randomIngredients, setRandomIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    useEffect(() => {
        selectRandomIngredients(ingredientsArr)
    }, [])

    const handleIngredientUpdate = (isSelected, itemId) => {
        if (isSelected) {
            setSlots((n) => n - 1)
        } else {
            setSlots((n) => n + 1)
        }

        const newData = ingredientsArr.map((ingredient) => {
            if (ingredient.id === itemId) {
                return { ...ingredient, isSelected: isSelected }
            } else {
                return ingredient
            }
        })
        setIngredientsArr(newData)

        const newSelectedIngredients = newData.filter((ingredient) => ingredient.isSelected)
        setSelectedIngredients(newSelectedIngredients)
        console.log("new data", newData)
        console.log("selectedIngretiens", newSelectedIngredients)
    }

    const selectRandomIngredients = (ingredientsArr) => {
        const ingredientIds = ingredientsArr.map((ingredient) => ingredient.id)
        let selectedIds = []
        if (selectedIngredients.length > 0) {
            selectedIds = selectedIngredients.map((ingredient) => ingredient.id)
        }
        const randomIds = []
        while (randomIds.length < slots) {
            console.log(slots)
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (!randomIds.includes(randomId) && !selectedIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }
        const random = ingredientsArr.filter((ingredient) => randomIds.includes(ingredient.id))
        console.log("rando ing",random);
        console.log("selectedIngs", selectedIngredients);
        const selected = [...selectedIngredients, ...random]
        console.log("shown ingredients",selected)
        setRandomIngredients(() => selected)
    }

    const shuffleIngredients = () => {
        selectRandomIngredients(ingredientsArr)
    }

    return (
        <IngredientsContext.Provider
            value={{
                selectedIngredients,
                randomIngredients,
                shuffleIngredients,
                handleIngredientUpdate,
                ingredients: ingredientsArr,
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
