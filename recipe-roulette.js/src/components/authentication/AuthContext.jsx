import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        try {
            const localAuthentication = JSON.parse(window.localStorage.getItem("authToken"))
            if (localAuthentication) {
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    function login() {
        setIsAuthenticated(true)
        try {
            const examepleToken = JSON.stringify({ token: 9999 })
            window.localStorage.setItem("authToken", examepleToken)
        } catch (error) {
            console.error(error)
        }
    }

    function logout() {
        window.localStorage.removeItem("authToken")
        setIsAuthenticated(false)
        console.log(isAuthenticated)
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}
