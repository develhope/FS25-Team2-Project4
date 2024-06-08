import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useRecipesContext } from "../../contexts/RecipesContext"

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import classes from "./Header.module.scss"
import TuneIcon from "@mui/icons-material/Tune"
import LockResetIcon from "@mui/icons-material/LockReset"
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"

import { IngredientSearch } from "../Search/SearchBar/IngredientSearch"
import { IcoButton } from "../Buttons/IcoButton/IcoButton"
import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import { BaseSearch } from "../Search/BaseSearch/BaseSearch"

export function Header({ handleMenuToggle, handleSidebarToggle, handleRecipesSidebarToggle }) {
    const [title, setTitle] = useState("/")
    const { targetedRecipe, setTargetedRecipe, filteredRecipes, searchFilteredRecipes, setInputValue, inputValue } =
        useRecipesContext()
    const { handleDeselectAll } = useManageIngredients()

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
            <header className={classes.header}>
                <div className={classes.topItem}>
                    <div className={classes.leftItems}>
                        {location.pathname === "/recipes-results" ? (
                            <div onClick={() => navigate("/discovery")} className={classes.backIcon}>
                                <ArrowBackIcon stroke={2} fontSize="small" />
                            </div>
                        ) : null}
                        {location.pathname === "/recipe" ? (
                            <div
                                onClick={() => {
                                    try {
                                        const path = localStorage.getItem("prevPath")
                                        if (path) {
                                            navigate(path)
                                        } else {
                                            navigate("/")
                                        }
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                                className={classes.backIcon}
                            >
                                <ArrowBackIcon fontSize="small" />
                            </div>
                        ) : null}

                        <h1>{title}</h1>
                    </div>

                    <div className={classes.rightItems}>
                        <div className={classes.menu}>
                            {location.pathname !== "/" ? <MenuOutlinedIcon onClick={handleMenuToggle} /> : null}
                        </div>
                    </div>
                </div>
                {location.pathname === "/recipes-results" && (
                    <section className={classes.globalActions}>
                        {/* <IngredientSearch isFixed={true} /> */}
                        <BaseSearch data={searchFilteredRecipes} inputValue={inputValue} setInputValue={setInputValue} />
                        <IcoButton
                            action={handleRecipesSidebarToggle}
                            label="Filters"
                            icon={<TuneOutlinedIcon fontSize="small" />}
                        />
                    </section>
                )}
                {location.pathname === "/favorited" && (
                    <section className={classes.globalActions}>
                        {/* <IngredientSearch isFixed={true} /> */}
                        <BaseSearch
                            data={searchFilteredRecipes.filter((rec) => rec.isFavorited)}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                        <IcoButton
                            action={handleRecipesSidebarToggle}
                            label="Filters"
                            icon={<TuneOutlinedIcon fontSize="small" />}
                        />
                    </section>
                )}
                {location.pathname === "/discovery" && (
                    <div className={classes.globalActions}>
                        <IngredientSearch isFixed={true} searchCriteria="isSelected" />
                        <IcoButton action={() => handleDeselectAll("isSelected")} icon={<LockResetIcon fontSize={"medium"} />} />
                        <IcoButton action={() => handleSidebarToggle()} icon={<TuneIcon fontSize={"small"} />} />
                    </div>
                )}
            </header>
        )
    )
}
