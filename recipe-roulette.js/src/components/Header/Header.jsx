import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import classes from "./Header.module.scss"

export function Header({ handleMenuToggle }) {
    const [title, setTitle] = useState("/")
    const { targetedRecipe } = useRecipesContext()
    const navigate = useNavigate()
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
                <div className={classes.leftItems}>
                    {location.pathname === "/recipes-results" ? (
                        <div onClick={() => navigate("/discovery")} className={classes.backIcon}>
                            <ArrowBackIcon stroke={2} fontSize="small" />
                        </div>
                    ) : null}

                    <h1>{title}</h1>
                </div>

                <div className={classes.rightItems}>
                    <div className={classes.menu}>
                        {location.pathname !== "/" ? <MenuOutlinedIcon onClick={handleMenuToggle} /> : null}
                    </div>
                </div>
            </header>
        )
    )
}
