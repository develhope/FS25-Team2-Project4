import { useState } from "react"

export function useDiscovery() {
    const [fixedPosition, setFixedPosition] = useState(false)
    const [isToggled, setIsToggled] = useState(false)

    function handleSidebarToggle() {
        setIsToggled((b) => !b)
    }

    return {
        fixedPosition,
        isToggled,
        setFixedPosition,
        handleSidebarToggle,
    }
}
