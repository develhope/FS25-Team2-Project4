import { createContext, useContext, useState } from "react"
import { useAuth } from "../../hooks/Auth/useAuth"

// Creare il contesto
const SnackbarContext = createContext()

// Hook per usare il contesto
export const useSnackbar = () => useContext(SnackbarContext)

// Provider del contesto
export const SnackbarProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false)
    const [message, setMessage] = useState("")
    const [intervalId, setIntervalId] = useState(null)
    const { isAuthenticated } = useAuth();
    const [showBtn, setShowBtn] = useState(false);

    const handleOpenSnackbar = (message) => {
        setShowBtn(false)
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

    function handleClickSnackBar () {
        if (!isAuthenticated) {
            handleOpenSnackbar("To access your favorites, you need to log in.")
            setShowBtn(true)
        }
    }

    return (
        <SnackbarContext.Provider value={{ isActive, message, showBtn, handleCloseSnackbar, handleOpenSnackbar, handleClickSnackBar }}>
            {children}
        </SnackbarContext.Provider>
    )
}
