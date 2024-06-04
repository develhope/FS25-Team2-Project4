import { createContext, useState } from "react";

export const AuthContext = createContext()


export function AuthProvider ({ children }) {
     const [isAuthenticated, setIsAuthenticated] = useState(false)

     function login () {
        setIsAuthenticated(true)
     }

     function logout () {
        setIsAuthenticated(false)
     }

     return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
     ) 
}
