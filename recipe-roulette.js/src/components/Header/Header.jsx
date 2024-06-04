import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import classes from "./Header.module.scss"

export function Header({ handleMenuToggle }) {
    const [title, setTitle] = useState("/")
    const { targetedRecipe } = useRecipesContext()
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setTitle("Welcome!")
                break
            case "/discovery":
                setTitle("Roulette")
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
            case "/recipe":
                setTitle(targetedRecipe.title)
        }
    }, [location.pathname])

    return (
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && (
            <header>
                <h1>{title}</h1>

                <div className={classes.rightItems}>
                    <div className={classes.menu}>
                        {location.pathname !== "/" ? <MenuOutlinedIcon onClick={handleMenuToggle} /> : null}
                    </div>
                </div>
            </header>
        )
    )
}
