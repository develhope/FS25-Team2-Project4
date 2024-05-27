import React, { createContext, useContext, useState } from "react"

// Creare il contesto
const SnackbarContext = createContext()

// Hook per usare il contesto
export const useSnackbar = () => useContext(SnackbarContext)

// Provider del contesto
export const SnackbarProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false)
    const [message, setMessage] = useState("")
    const [intervalId, setIntervalId] = useState(null)

    const handleOpenSnackbar = (message) => {
        setMessage(message)
        if (!isActive) {
            setIntervalId(
                setTimeout(() => {
                    setIsActive(false)
                }, 2500)
            )
            setIsActive(true)
        }
    }

    const handleCloseSnackbar = () => {
        clearInterval(intervalId)
        setIsActive(false)
    }

    return (
        <SnackbarContext.Provider value={{ isActive, message, handleCloseSnackbar, handleOpenSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    )
}
