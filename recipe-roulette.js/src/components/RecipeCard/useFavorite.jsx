import { useState } from "react"

export function useFavorite(isFav) {
    const [favState, setFavState] = useState(isFav)

    function handleFavState(e) {
        e.preventDefault()
        e.stopPropagation()
        setFavState((f) => !f)
    }
    return { favState, handleFavState }
}
