import { useLocation } from "react-router-dom"

export const useLocationHook = () => {
    const location = useLocation()
    return { location: location.pathname }
}
