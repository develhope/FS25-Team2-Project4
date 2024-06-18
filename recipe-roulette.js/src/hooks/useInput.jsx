import { useState } from "react"

export function useInput() {
    const [inputState, setInputState] = useState(false)

    function handleInputActivation() {
        setTimeout(() => {
            setInputState(true)
        }, 0)
    }

    function handleBlur(e) {
        setTimeout(() => {
            e.target.blur()
            setInputState(false)
        }, 0)
    }
    return { inputState, handleInputActivation, handleBlur }
}
