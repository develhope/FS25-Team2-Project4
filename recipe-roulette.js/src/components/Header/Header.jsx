import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import classes from "./Header.module.scss";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "../Buttons/Button/Button"

export function Header({ handleMenuToggle, handleSidebarToggle, handleRecipesSidebarToggle }) {
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
            case "/recipes-results":
                    setTitle("Results")
                    break
        }
    }, [location.pathname])
    console.log(location.pathname);

    return (
        (location.pathname !== "/login" && location.pathname !== "/signup") && 
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
                    <Button action={handleSidebarToggle} label="Filters" icon="tune" size={18} />
                )}
                {location.pathname === "/recipes-results" && (
                    <Button action={handleRecipesSidebarToggle} label="Filters" icon="tune" size={18} />
                )}
            </header>
        )
    
}
