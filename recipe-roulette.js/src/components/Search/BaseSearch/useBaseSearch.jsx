import { useState } from "react"

export function useBaseSearch(setInputValue) {
    const [isFocused, setIsFocused] = useState(false)

    function handleInputActivation() {
        setIsFocused(true)
    }

    function handleBlur(e) {
        e.target.blur()
        setIsFocused(false)
    }
    const handlePressEnter = (e) => {
        console.log(e);
        if (e.keyCode === 13) {
            handleBlur(e)
        } else if (e.keyCode === 27) {
            handleBlur(e)
            setInputValue("")
        }
    }

    return { handlePressEnter, handleInputActivation, handleBlur, isFocused }
}
