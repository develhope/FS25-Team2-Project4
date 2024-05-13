import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function useIngredientCard(label, id, isSelected, bgColor) {
    const { handleIngredientUpdate, ingredients, randomIngredients } = useManageIngredients()

    //useState
    const [inputValues, setInputValues] = useState({
        empty: "",
        initial: "",
        current: label,
    })

    const [cardState, setCardState] = useState({
        label: label,
        state: isSelected,
        id: id,
        color: bgColor,
    })
    const ingredientsArr = ingredients

    //useEffect
    useEffect(() => {
        setInputValues((prevData) => {
            return {
                ...prevData,
                ["current"]: label,
            }
        })
        setCardState(() => {
            return {
                ["label"]: label,
                ["state"]: isSelected,
                ["id"]: id,
                ["color"]: bgColor,
            }
        })
    }, [label, bgColor, isSelected, id])


    //funzione 1 seleziona l'elemento e aggiorna l'array di ingredienti di conseguenza
    function handleIngredientClick() {
        setCardState((prevData) => {
            return {
                ...prevData,
                ["state"]: !cardState.state,
            }
        })
        handleIngredientUpdate(!cardState.state, cardState.id)
    }

    //funzione 2 gestione dell'input quando viene attivato (click/ focus)
    function handleInputActivation(e) {
        //usiamo stopPropagation perchè in caso contrario il click arriverebbe al componente padre e l'ingrediente verrebbe selezionato
        e.stopPropagation()
        //se il campo di testo non è vuoto, inputValues.initial viene impostato al valore che si trovava precedentemente in current (ingrediente originale)
        if (inputValues.current !== "") {
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["initial"]: prev.current,
                    //e current viene impostato a stringa vuota per mermettere di scrivervi senza dover cancellare
                    ["current"]: "",
                }
            })

            //imposto il valore isSelected dell'elemento "precedente" (che vogliamo sovrascrivere) a false, e lascio la variabile di stato invariata. 
            //In questo modo non verrà visualizata l'animazione di deselezione, ma il nuovo ingredeinte prederà comunque il posto di quello precedente.
            handleIngredientUpdate(false, id)
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

    //quando l'input viene disattivato (deselezionato), viene effettuato un filter dell'array contenente i nomi di tutti gli ingredienti in database
    function handleInputDeactivation() {
        const isInDatabase = ingredientsArr.filter(
            (ingredient) =>
                ingredient.name.toUpperCase() === inputValues.current.toUpperCase() &&
                !ingredient.isSelected
        )

        let isInDisplay = []

        if (isInDatabase.length > 0) {
            isInDisplay = randomIngredients.filter(
                (ingredient) => ingredient === isInDatabase[0]
            )
        }

        //se il valore all'interno dell'input corrisponde al nome di un ingrediente, e non è già presente tra gli
        //ingredienti visibili a schermo, il nome dell'ingrediente viene impostato come valore dell'input
        if (inputValues.current !== "" && isInDatabase.length === 1 && isInDisplay.length === 0) {
            //imposto la variabile di stato inputValues (quella che renderizza il nome dell'ingrediente)

            //e la variabile di stato con tutte le altre informazioni sulla card
            setCardState(() => {
                return {
                    label: isInDatabase[0].name,
                    id: isInDatabase[0].id,
                    ["state"]: true,
                    color: isInDatabase[0].bgColor,
                }
            })
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["current"]: isInDatabase[0].name,
                }
            })
            handleIngredientUpdate(true, isInDatabase[0].id)
        } 
        
        /* else if (isInDatabase.length === 1 && isInDisplay.length === 1) {
            //handleIngredintOnDisplay (spunta una snackbar di avviso oppure selezioniamo quell'elemento al posto di quello selezionato)
            //...
            //in caso contrario, l'input viene impostato al suo valore iniziale
            //ad esempio de prima di cliccare sull'input avevamo l'ingrediente "tomato", il valore dell'input tornerà "tomato"
        } 
        
        */else {
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["current"]: prev.initial,
                }
            })
            handleIngredientUpdate(cardState.state, id)
        }
    }

    //anche quando si preme enter, l'input viene deselezionato e quindi viene eseguita la funzione handleInputDeactivation
    function handlePressEnter(e) {
        if (e.keyCode === 13) {
            e.target.blur()
        }
    }

    return {
        handleIngredientClick,
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handlePressEnter,
        inputValues,
        setInputValues,
        setCardState,
        cardState,
    }
}
