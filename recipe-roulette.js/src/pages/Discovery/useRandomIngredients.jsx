import { useState, useEffect, useMemo } from "react"
import ingredients from "../../components/IngredientCard/ingredients"

export function useRandomIngredients(id, isSelected) {
    const [ingredientsArr, setIngredientsArr] = useState(ingredients)

    const [slots, setSlots] = useState(5)

    const [randomIngredients, setRandomIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    function handleIngredientUpdate(isSelected, itemId) {
        console.log(itemId)
        if (isSelected) {
            setSlots((n) => n - 1)
        } else {
            setSlots((n) => n + 1)
        }

        //lista degli ingredienti - gli ingredienti selezionati
        setIngredientsArr((prevData) => {
            return prevData.map((ingredient) => {
                if (!ingredient.isSelected) {
                    return ingredient
                }
            })
        })
        // return { ...ingredient, ["isSelected"]: isSelected }
    }

    // Effettua la selezione iniziale degli ingredienti casuali
    useEffect(() => {
        selectRandomIngredients(ingredientsArr)
    }, [])

    // Funzione per selezionare casualmente 5 ingredienti
    function selectRandomIngredients(ingredientsArr) {
        const ingredientIds = ingredientsArr.map((ingredient) => ingredient.id)
        const randomIds = []
        let selectIngLength = selectedIngredients.length
        while (randomIds.length < slots - selectIngLength) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (!randomIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }

        const selected = ingredients.filter((ingredient) => randomIds.includes(ingredient.id))
        setRandomIngredients(selected)
    }

    // Funzione per selezionare nuovamente gli ingredienti
    function reselectIngredients() {
        selectRandomIngredients(ingredientsArr)
    }

    return {
        randomIngredients,
        reselectIngredients,
        handleIngredientUpdate,
        ingredients: ingredientsArr,
    }
}
