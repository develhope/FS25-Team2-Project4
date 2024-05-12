import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function useIngredientCard(label, id, isSelected, bgColor) {
    const { handleIngredientUpdate, ingredients } = useManageIngredients()

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

    useEffect(() => {
        setCardState(() => {
            return {
                label: label,
                state: isSelected,
                id: id,
                color: bgColor,
            }
        })
    }, [label, bgColor, isSelected, id])

    function handleIngredientClick() {
        setCardState((prevData) => {
            return {
                ...prevData,
                ["state"]: !cardState.state,
            }
        })
        handleIngredientUpdate(!cardState.state, cardState.id)
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
            setCardState((prevData) => {
                return {
                    ...prevData,
                    ["state"]: false,
                }
            })
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

    //quando l'input viene deselezionato, viene effettuato un filter dell'array contenente i nomi di tutti gli ingredienti in database
    function handleInputDeactivation(e) {
        const isInDatabase = ingredientsArr.filter(
            (ingredient) =>
                ingredient.name.toUpperCase() === e.target.value.toUpperCase() &&
                !ingredient.isSelected
        )

        //se il valore all'interno dell'input corrisponde al nome di un ingrediente, il nome dell'ingrediente viene
        //impostato come valore dell'input
        if (inputValues.current !== "" && isInDatabase.length === 1) {
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["current"]: isInDatabase[0].name,
                }
            })

            setCardState(() => {
                return {
                    label: isInDatabase[0].name,
                    id: isInDatabase[0].id,
                    ["state"]: true,
                    color: isInDatabase[0].bgColor,
                }
            })
            handleIngredientUpdate(true, isInDatabase[0].id)

            //in caso contrario, l'input viene impostato al suo valore iniziale
            //ad esempio de prima di cliccare sull'input avevamo l'ingrediente "tomato", il valore dell'input tornerà "tomato"
        } else {
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
        id,
        cardState,
    }
}
