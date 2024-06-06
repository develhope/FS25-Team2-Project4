import { useState } from "react"

export function useBaseSearch() {
    const [isFocused, setIsFocused] = useState(false)

    function handleInputActivation() {
        setIsFocused(true)
    }

    function handleBlur(e) {
        e.target.blur()
        setIsFocused(false)
    }
    const handlePressEnter = (e) => {
        if (e.keyCode === 13) {
            handleBlur(e)
            //disattiva l'input dopo aver chiamato la funzione (previene comportamenti indesiderati)
        }
    }

    return { handlePressEnter, handleInputActivation, handleBlur, isFocused }
}
