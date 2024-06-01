import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import classes from "./Header.module.scss"
import { Button } from "../Buttons/Button/Button"

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded"
export function Header({ handleMenuToggle, handleSidebarToggle, handleRecipesSidebarToggle }) {
    const [title, setTitle] = useState("/")
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setTitle("Welcome!")
                break
            case "/discovery":
                setTitle("RecipeRoulette")
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

    return (
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && (
            <header>
                <h1>{title}</h1>

                <div className={classes.rightItems}>
                    {/* {location.pathname === "/favorited" && (
                        <Button action={handleSidebarToggle} label="Filters" icon={<TuneOutlinedIcon fontSize="small" />} />
                    )}
                    {location.pathname === "/recipes-results" && (
                        <Button
                            action={handleRecipesSidebarToggle}
                            label="Filters"
                            icon={<TuneOutlinedIcon fontSize="small" />}
                        />
                    )} */}
                    <div className={classes.menu}>
                        {location.pathname !== "/" ? <MenuOutlinedIcon onClick={handleMenuToggle} /> : <WavingHandRoundedIcon />}
                    </div>
                </div>
            </header>
        )
    )
}
