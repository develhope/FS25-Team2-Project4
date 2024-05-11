import { useEffect, useMemo, useState } from "react"
import ingredients from "./ingredients"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function useIngredientCard(label, isSelected, id) {
    const { handleIngredientUpdate, ingredients } = useManageIngredients()

    const [selectSate, setSelectSate] = useState(isSelected)
    const [inputValues, setInputValues] = useState({
        empty: "",
        initial: "",
        current: label,
    })

    const ingredientsArr = ingredients
    const ingredientsName = useMemo(() => ingredientsArr.map((ingredient) => ingredient.name))

    //quando l'ingrediente viene cliccato, viene impostata la varibile di stato selectState al valore opposto (true -> false)(false ->true)
    function handleIngredientSelect() {
        setSelectSate((s) => {
            const newState = !s
            isSelected = newState
            //e viene chiamata la funzione handleIngredientUpdate di useManageIngredients che imposta la variabile globale (lista degli ingredienti) aggiornando il valore di "ingredient.isSelected"
            handleIngredientUpdate(newState, id)
            return newState
        })
    }

    //quando l'input viene cliccato, viene resettato il campo di testo (per evitare che debba essere cancellato il testo precedente) e memorizzato il valore precedente in inputValues.initial
    function handleInputActivation(e) {
        //usiamo stopPropagation perchè in caso contrario il click arriverebbe al componente padre e l'ingrediente verrebbe selezionato
        e.stopPropagation()
        //se il campo di testo è vuoto, allora input.values non viene re-impostato (perchè sarebbe impostato a vuoto), e mantiene sempre il valore assegnato al primo click (ovvero ciò che si trovava nel campo di testo prima di cliccarvi)
        if (inputValues.current !== "") {
            setInputValues((prev) => {
                console.log(prev.current)
                return {
                    ...prev,
                    ["initial"]: prev.current,
                    ["current"]: "",
                }
            })
        }
    }

    //onChange, viene impostato un nuovo valore a inputValues.current (quello mostrato a schermo)
    function handleInputChange(e) {
        setInputValues((prev) => {
            return {
                ...prev,
                ["current"]: e.target.value,
            }
        })
    }

    //quando l'input viene deselezionato, viene effettuato un filter dell'array contenente i nomi di tutti gli ingredienti in database
    function handleInputDeactivation(e) {
        console.log(ingredientsName)
        const isInDatabase = ingredientsName.filter(
            (ingredient) => ingredient.toUpperCase() === e.target.value.toUpperCase()
        )
        console.log(isInDatabase)
        //se il valore all'interno dell'input corrisponde al nome di un ingrediente, il nome dell'ingrediente viene
        //impostato come valore dell'input
        if (inputValues.current !== "" && isInDatabase.length === 1) {
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["current"]: isInDatabase[0],
                }
            })
            setSelectSate(true)
            //in caso contrario, l'input viene impostato al suo valore iniziale
            //ad esempio de prima di cliccare sull'input avevamo l'ingrediente "tomato", il valore dell'input tornerà "tomato"
        } else {
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["current"]: prev.initial,
                }
            })
        }
    }

    //anche quando si preme enter, l'input viene deselezionato e quindi viene eseguita la funzione handleInputDeactivation
    function handlePressEnter(e) {
        if (e.keyCode === 13) {
            e.target.blur()
        }
    }

    return {
        handleIngredientSelect,
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handlePressEnter,
        selectSate,
        inputValues,
        id,
    }
}
