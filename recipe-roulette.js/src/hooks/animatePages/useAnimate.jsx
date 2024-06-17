import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export function useAnimate(destination) {
    const location = useLocation()
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        destination === location.pathname ? setAnimate(true) : setAnimate(false)
    }, [location])

    return { animate, setAnimate }
}
