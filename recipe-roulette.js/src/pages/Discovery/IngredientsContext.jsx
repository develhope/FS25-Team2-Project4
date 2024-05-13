import { useState, useEffect, createContext, useContext } from "react"
import ingredients from "../../components/IngredientCard/ingredients"

//creo il contesto
const IngredientsContext = createContext()

//creo il provider di contesto (quello che avvolge tutti i componenti a cui verrà resa accessibile questa libreria di variabili e funzioni)
export const IngredientsProvider = ({ children }) => {
    //variabile di stato per l'array di ingredeinti
    const [ingredientsArr, setIngredientsArr] = useState(ingredients)
    const [initialValue, setInitialValue] = useState(5)
    //variabile di stato per gestire gli slot liberi per generazione di nuovi ingredienti
    const [slots, setSlots] = useState(initialValue)
    //variabile di stato che contiene gli ingredienti generati casualmente che verrano passati a "discovery" e visualizzati a schermo
    const [randomIngredients, setRandomIngredients] = useState([])
    //variabile di stato che contiene gli elementi selezionati (ingredient.isSelected === true)
    const [selectedIngredients, setSelectedIngredients] = useState([])

    //prima generazione di ingredienti random
    useEffect(() => {
        selectRandomIngredients(ingredientsArr, slots, selectedIngredients)
    }, [initialValue])

    //funzione per modificare l'array di ingredienti quando un ingrediente viene selezionato (imposta ingredient.isSelected a true, il resto dell'array rimane invariato)
    const handleIngredientUpdate = (selectState, itemId) => {
        //mappo l'array per aggiornare il valore dell'ingrediente modificato (selezionato/deselezionato/sostituito)
        const newData = ingredientsArr.map((ingredient) => {
            if (ingredient.id === itemId) {
                return { ...ingredient, isSelected: selectState }
            } else {
                return ingredient
            }
        })

        //impostiamo la variabile di stato uguale all'array mappato sopra
        setIngredientsArr(newData)

        //mappo l'array appena aggiornato per prendere tutti gli ingredienti con valore "isSelected = true"
        const newSelectedIngredients = newData
            .filter((ingredient) => ingredient.isSelected)
            .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))

        //e imposto il risultato all'array selectedIngredients (che contiene solo gli elementi con valore "isSelected = true")
        setSelectedIngredients(newSelectedIngredients)

        setSlots(() => {
            const newN = initialValue - newSelectedIngredients.length
            return newN
        })
    }

    //funzione che genera randomicamente gli ingredienti
    const selectRandomIngredients = (ingredientsArr, slots, selectedIngredients) => {
        const ingredientIds = ingredientsArr.map((ingredient) => ingredient.id)
        const selectedIds = selectedIngredients.map((ingredient) => ingredient.id)
        const randomIds = []

        while (randomIds.length < slots) {
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            if (!randomIds.includes(randomId) && !selectedIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }

        const newRandomIngredients = ingredientsArr.filter((ingredient) => randomIds.includes(ingredient.id))

        setRandomIngredients([...selectedIngredients, ...newRandomIngredients])
  
        return newRandomIngredients // Restituisci solo gli ingredienti selezionati casualmente
    }

    //funzione che ri esegue la funzione sopra
    const shuffleIngredients = () => {
        selectRandomIngredients(ingredientsArr, slots, selectedIngredients)
    }
    const handleIngredientsIncrement = () => {
        if (initialValue < 8) {
            setInitialValue((n) => n + 1)
            setSlots((n) => n + 1)
            selectRandomIngredients(ingredientsArr, slots, selectedIngredients)
        }
    }
    const handleIngredientsDecrement = (id, e) => {
        const isTargetSelected = ingredientsArr.find(ingredient => ingredient.id === id)
        e.stopPropagation()
        if (initialValue > 3 && !isTargetSelected.isSelected) {
            setInitialValue((n) => n - 1)
            setSlots((n) => n - 1)
            selectRandomIngredients(ingredientsArr, slots, selectedIngredients)
        }
    }
    //ritorno tuttle le funzioni e le variabili necessarie
    return (
        <IngredientsContext.Provider
            value={{
                selectedIngredients,
                randomIngredients,
                shuffleIngredients,
                handleIngredientUpdate,
                ingredients: ingredientsArr,
                handleIngredientsIncrement,
                handleIngredientsDecrement,
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
