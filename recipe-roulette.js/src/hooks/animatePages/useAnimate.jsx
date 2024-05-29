import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useAnimate () {
    const location = useLocation()
    const [animate, setAnimate] = useState()
    
    useEffect(() => {
            setAnimate(true)
    }, [location.pathname])

    return {animate}
}

