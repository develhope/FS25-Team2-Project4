import { useState } from "react"

export function useFavorite() {
    const [favState, setFavState] = useState(false)

    function handleFavState(e) {
        e.preventDefault()
        e.stopPropagation()
        setFavState((f) => !f)
    }
    return { favState, handleFavState }
}
