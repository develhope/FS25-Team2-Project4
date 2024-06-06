import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import classes from "./Header.module.scss"

export function Header({ handleMenuToggle }) {
    const [title, setTitle] = useState("/")
    const { targetedRecipe, setTargetedRecipe } = useRecipesContext()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {}, [])

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
                try {
                    const currentTargetedRecipe = JSON.parse(window.localStorage.getItem("targetedRecipe"))
                    if (currentTargetedRecipe) {
                        setTargetedRecipe(currentTargetedRecipe)
                        setTitle(currentTargetedRecipe.title)
                    }
                } catch (error) {
                    console.log(error)
                }
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
                    {location.pathname === "/recipe" ? (
                        <div onClick={() => navigate(-1)} className={classes.backIcon}>
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
