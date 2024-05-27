import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import classes from "./Header.module.scss"
import { MaterialSymbol } from "react-material-symbols"

export function Header({ handleMenuToggle }) {
    const [title, setTitle] = useState("/")
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setTitle("Welcome!")
                break
            case "/discovery":
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
            <div className={classes.leftItems}>
                <MaterialSymbol
                    onClick={handleMenuToggle}
                    className={classes.menu}
                    icon="menu"
                    weight={500}
                    size={24}
                    grade={24}
                />
                <h1>{title}</h1>
            </div>

            {location.pathname === "/favorited" && (
                <button className={classes.leftIcoButton}>
                    <MaterialSymbol icon="tune" />
                    Filters
                </button>
            )}
        </header>
    )
}
