import { useState } from "react"

export function useDiscoverySidebar() {
    const [fixedPosition, setFixedPosition] = useState(false)
    const [sidebarState, setsidebarState] = useState(false)

    function handleSidebarToggle() {
        setsidebarState((b) => !b)
    }

    return {
        fixedPosition,
        sidebarState,
        setFixedPosition,
        handleSidebarToggle,
    }
}
