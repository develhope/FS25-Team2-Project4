import { useState, useEffect, createContext, useContext } from "react"
import ingredients from "../../components/IngredientCard/ingredients"

//creo il contesto
const IngredientsContext = createContext()

//creo il provider di contesto (quello che avvolge tutti i componenti a cui verrà resa accessibile questa libreria di variabili e funzioni)
export const IngredientsProvider = ({ children }) => {
    //variabile di stato per l'array di ingredeinti
    const [ingredientsArr, setIngredientsArr] = useState(ingredients)
    //variabile di stato per gestire gli slot liberi per generazione di nuovi ingredienti
    const [slots, setSlots] = useState(5)
    //variabile di stato che contiene gli ingredienti generati casualmente che verrano passati a "discovery" e visualizzati a schermo
    const [randomIngredients, setRandomIngredients] = useState([])
    //variabile di stato che contiene gli elementi selezionati (ingredient.isSelected === true)
    const [selectedIngredients, setSelectedIngredients] = useState([])

    //prima generazione di ingredienti random
    useEffect(() => {
        selectRandomIngredients(ingredientsArr)
    }, [])

    //funzione per modificare l'array di ingredienti quando un ingrediente viene selezionato (imposta ingredient.isSelected a true, il resto dell'array rimane invariato)
    const handleIngredientUpdate = (selectState, itemId) => {

        //mappo l'array per aggiornare il valore dell'ingrediente selezionato/deselezionato
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
        const newSelectedIngredients = newData.filter((ingredient) => ingredient.isSelected)

        //e imposto il risultato all'array selectedIngredients (che contiene solo gli elementi con valore "isSelected = true")
        setSelectedIngredients(newSelectedIngredients)

        console.log("new data", newData)
        console.log("selectedIngretiens", newSelectedIngredients)

        setSlots(() => {
            const newN = 5 - newSelectedIngredients.length
            return newN
        })
    }

    //funzione che genera randomicamente gli ingredienti
    const selectRandomIngredients = (ingredientsArr) => {
        //estraggo gli Id di tutti gli ingredienti con map
        const ingredientIds = ingredientsArr.map((ingredient) => ingredient.id)

        //creo un array che contiene gli id degli elementi selezionati (isSelected = true)
        let selectedIds = []

        if (selectedIngredients.length > 0) {
            //e assegno a questo array gli id degli elementi selezionati
            selectedIds = selectedIngredients.map((ingredient) => ingredient.id)
        }

        //array che conterrà gli id randomicamente pescati dall'array di id
        const randomIds = []

        //finchè l'array non avrà un numero di elementi uguale al numero di slot disponibili, continuerà a cercare nuovi Id
        while (randomIds.length < slots) {
            console.log("slots", slots)
            const randomId = ingredientIds[Math.floor(Math.random() * ingredientIds.length)]
            //l'id viene pescato solo se quell'id non si trova ne in randomIds ne in selectedIds
            if (!randomIds.includes(randomId) && !selectedIds.includes(randomId)) {
                randomIds.push(randomId)
            }
        }
        //filtro l'array prendendo solo gli elementi che hanno un id che corrisconde ad un id presente in randomIds
        const random = ingredientsArr.filter((ingredient) => randomIds.includes(ingredient.id))
        console.log("rando ing", random)
        console.log("selectedIngs", selectedIngredients)

        //creo un array selected composto dagli elementi selezionati + i restanti elementi selezionati randomicamente
        const result = [...selectedIngredients, ...random]
        console.log("shown ingredients", result)

        //imposto la variabile di stato randomIngredient uguale a "selected"
        setRandomIngredients(result)
    }

    //funzione che ri esegue la funzione sopra
    const shuffleIngredients = () => {
        selectRandomIngredients(ingredientsArr)
    }

    //ritorno tuttle le funzioni e le variabili necessarie
    return (
        <IngredientsContext.Provider
            value={{
                selectedIngredients,
                randomIngredients,
                shuffleIngredients,
                handleIngredientUpdate,
                ingredients: ingredientsArr
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
