import { useState } from "react"

export function useBaseSearch(setInputValue) {
    const [isFocused, setIsFocused] = useState(false)
    const [condition, setCondition] = useState(true)

    function handleInputActivation() {
        setIsFocused(true)
    }

    function handleBlur(e) {
        e.target.blur()
        setIsFocused(false)
    }
    const handlePressEnter = (e) => {
        console.log(e)
        if (e.keyCode === 13) {
            handleBlur(e)
        } else if (e.keyCode === 27) {
            handleBlur(e)
        }
    }

    return { handlePressEnter, handleInputActivation, handleBlur, setCondition, condition, isFocused }
}
