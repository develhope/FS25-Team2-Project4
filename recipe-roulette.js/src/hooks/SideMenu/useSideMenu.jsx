import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

export function useSideMenu() {
    const [path, setPath] = useState("/")
    const [menuState, setMenuState] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setPath(location.pathname)
    }, [location.pathname])

    function handleMenuToggle() {
        setMenuState((b) => !b)
    }
    return { handleMenuToggle, path, menuState }
}
