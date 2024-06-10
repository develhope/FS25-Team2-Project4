import { createContext, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    function login() {
        setIsAuthenticated(true)
        window.localStorage.setItem("authToken", "exampleToken")
        console.log(isAuthenticated);
    }

    function logout() {
        window.localStorage.removeItem("authToken")
        setIsAuthenticated(false)
        console.log(isAuthenticated);
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}
