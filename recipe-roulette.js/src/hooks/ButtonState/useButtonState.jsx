import { useState } from "react"

export function useButtonState() {
    const [isActive, setIsActive] = useState(true)
    
    return { isActive, setIsActive }
}
