import { useState, useEffect } from "react"
import ingredients from "../../components/IngredientCard/ingredients"


export function useManageIngredients(id, isSelected) {
    const [ingredientsArr, setIngredientsArr] = useState(ingredients)

    const [slots, setSlots] = useState(5)

    const [randomIngredients, setRandomIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    function handleIngredientUpdate(isSelected, itemId) {
        console.log(itemId)

        if (isSelected) {
            setSlots((n) => n - 1)
            console.log("-1 slot")
        } else {
            setSlots((n) => n + 1)
            console.log("+1 slot")
        }

        //modifichiamo l'array di ingredienti impostando il nuovo valore di isSelected all'ingrediente selezionato/deselezionato
        setIngredientsArr((prevData) => {
            console.log(prevData)
            const newData = prevData.map((ingredient) => {
                if (ingredient.id === itemId) {
                    return { ...ingredient, isSelected: isSelected }
                } else {
                    return ingredient
                }
            })
            console.log("IngredientsList", newData)
            return newData
        })
        setSelectedIngredients(() => {
            const newData = ingredientsArr.filter((ingredient) => {
                if (ingredient.isSelected) {
                    console.log(ingredient.isSelected)
                    return ingredient
                }
            })
            console.log("selected items", newData)
            return newData
        })
    }

    // Effettua la selezione iniziale degli ingredienti casuali
    useEffect(() => {
        selectRandomIngredients(ingredientsArr)
    }, [])

    // Funzione per selezionare casualmente 5 ingredienti
    function selectRandomIngredients(ingredientsArr) {
        //prendiamo tutti gli id degli elementi non selezionati e li pushamo nell'array sopra
        const ingredientIds = ingredientsArr.map((ingredient) => {
            if (!ingredient.isSelected) {
                return ingredient.id
            }
        })
        //creiamo un array che conterrà alcuni di questi Id (randomicamente selezionati)
        const randomIds = []
        while (randomIds.length < slots) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            //se l'id non è gia presente nell'array randomIds
            if (!randomIds.includes(randomId)) {
                //allora lo pushamo in randomIds
                randomIds.push(randomId)
            }
        }

        const selected = [
            ...ingredientsArr.filter((ingredient) => ingredient.isSelected),
            ...ingredients.filter((ingredient) => randomIds.includes(ingredient.id)),
        ]
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
