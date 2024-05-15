import { useEffect, useState } from "react"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"

export function useIngredientCard(label, id, isSelected, bgColor) {
    const { handleIngredientUpdate, ingredients, displayedIngredients, handleIngredientsDecrement } =
        useManageIngredients()

    const ingredientsArr = ingredients

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
        inputActive: false,
    })

    const [suggestions, setSuggestions] = useState(ingredients)

    //useEffect
    //aggiorna i dati della card quando vengono modificati label,id,isSelected,id o displayedIngredients
    useEffect(() => {
        setInputValues((prevData) => {
            return {
                ...prevData,
                ["current"]: label,
            }
        })
        setCardState((prevData) => {
            return {
                ...prevData,
                label: label,
                state: isSelected,
                id: id,
                color: bgColor,
            }
        })
    }, [label, bgColor, isSelected, id, displayedIngredients])

    useEffect(() => {
        setSuggestions(ingredients)
    }, [ingredients])

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
        e.stopPropagation()
        setCardState((prevData) => {
            return {
                ...prevData,
                ["inputActive"]: true,
            }
        })
        if (inputValues.current !== "") {
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["initial"]: cardState.label,
                    ["current"]: "",
                }
            })
            handleIngredientUpdate(false, cardState.id)
        }
    }

    //funzione 3 gestione del campo di input quando l'utente digita
    function handleInputChange(e) {
        //filter suggestions
        const newSuggestions = ingredientsArr.filter((ingredient) =>
            ingredient.name.toUpperCase().includes(e.target.value.toUpperCase())
        )
        setInputValues((prev) => {
            return {
                ...prev,
                ["current"]: e.target.value,
            }
        })
        setSuggestions(newSuggestions)
    }

    //funzione 4 gestione del click di un suggerimento
    function handleSuggestionClick(e, id) {
        e.stopPropagation()
        const clickedElement = ingredientsArr.find((ingredient) => ingredient.id === id)
        if (!clickedElement.isSelected) {
            setCardState(() => {
                return {
                    label: clickedElement.name,
                    id: clickedElement.id,
                    state: true,
                    color: clickedElement.bgColor,
                    inputActive: false,
                }
            })
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["current"]: clickedElement.name,
                }
            })
            e.target.value = clickedElement.name
            handleIngredientUpdate(true, clickedElement.id)
        }
    }

    //function 5 gestione della disattivazione dell'input
    function handleInputDeactivation(e) {
        const isInDatabase = ingredientsArr.filter(
            (ingredient) =>
                ingredient.name.toUpperCase().includes(e.target.value.toUpperCase()) &&
                !ingredient.isSelected
        )
        const isInDisplay = displayedIngredients.filter((ingredient) => ingredient == isInDatabase)

        if (e.target.value !== "" && isInDatabase.length > 0 && isInDisplay.length === 0) {
            console.log("currentvalue:", inputValues.current)
            setCardState(() => {
                return {
                    label: isInDatabase[0].name,
                    id: isInDatabase[0].id,
                    ["state"]: true,
                    color: isInDatabase[0].bgColor,
                    ["inputActive"]: false,
                }
            })
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["current"]: isInDatabase[0].name,
                }
            })
            handleIngredientUpdate(true, isInDatabase[0].id)
        } else {
            setInputValues((prev) => {
                return {
                    ...prev,
                    ["current"]: prev.initial,
                }
            })
            setCardState((prevData) => {
                return {
                    ...prevData,
                    ["inputActive"]: false,
                }
            })
            handleIngredientUpdate(cardState.state, cardState.id)
        }
        setSuggestions(ingredients)
    }

    // funnzione 6 quando si preme enter, l'input viene deselezionato e quindi viene eseguita la funzione handleInputDeactivation
    function handlePressEnter(e) {
        if (e.keyCode === 13) {
            e.target.blur()
        }
    }

    function handleXClick(e) {
        e.stopPropagation()
        if (cardState.inputActive) {
            setInputValues((prevData) => {
                return {
                    ...prevData,
                    current: "",
                }
            })
            setCardState((prevData) => {
                return {
                    ...prevData,
                    inputActive: false,
                }
            })
        } else {
            handleIngredientsDecrement(cardState.id, e)
        }
    }

    return {
        handleIngredientClick,
        handleInputActivation,
        handleInputChange,
        handleInputDeactivation,
        handleSuggestionClick,
        handlePressEnter,
        handleXClick,
        inputValues,
        setInputValues,
        setCardState,
        cardState,
        suggestions,
    }
}
