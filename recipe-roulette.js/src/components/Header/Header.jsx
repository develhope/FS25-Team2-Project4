import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import classes from "./Header.module.scss"
import { MaterialSymbol } from "react-material-symbols"

export function Header({handleMenuToggle}) {
    const [title, setTitle] = useState("/")
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setTitle("Discovery")
                break
            case "/favorited":
                setTitle("Favorited")
                break
            case "/settings":
                setTitle("Settings")
                break
        }
    }, [location.pathname])

    return (
        <header>
            <MaterialSymbol onClick={handleMenuToggle} className={classes.menu} icon="menu" size={24} grade={24} />
            <h1>{title}</h1>
        </header>
    )
}
