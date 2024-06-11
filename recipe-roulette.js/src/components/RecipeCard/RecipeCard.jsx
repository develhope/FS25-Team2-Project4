import { useLocation } from "react-router-dom"
import { useRecipeCard } from "./useRecipeCard"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { FilterChip } from "../FilterChip/FilterChip"

import FavoriteIcon from "@mui/icons-material/Favorite"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import Skeleton from "@mui/material/Skeleton"

import classes from "./RecipeCard.module.scss"
import { useState } from "react"
import { Snackbar } from "../Snackbar/Snackbar"
import { useAuth } from "../../hooks/Auth/useAuth"
import { useSnackbar } from "../Snackbar/useSnackbar"

function RecipeCard({
    handleClickLoginSnackBar,
    recipeId,
    isExpanded = false,
    title = "Card Title",
    image = "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202312/MIT_Food-Diabetes-01_0.jpg?itok=Mp8FVJkC",
    attributes,
    isFav = false,
    isGlutenFree = false,
    isVegetarian = false,
    isVegan = false,
    ingredients = [],
    preparation = [],
}) {
    const { handleCardState, handleOpenRecipePage, cardState, expandedCard, expandedIngredients, handleIngWrapperState } =
        useRecipeCard(recipeId, isFav, isExpanded)
    const { recipeAnimation } = useRecipesContext()
    const { isAuthenticated } = useAuth()
    const [animateMe, setAnimateMe] = useState(false) //animazione fade immagine
    const location = useLocation()

    setTimeout(() => {
        setAnimateMe(true)
    }, 0)

    return (
        <div
            onClick={() => {
                localStorage.setItem("prevPath", location.pathname)
                handleOpenRecipePage()
            }}
            className={`${classes.recipeCard} ${expandedCard && classes.recipeCardExpanded} ${recipeAnimation && classes.animateRecipeCard}`}
        >
            {/* topItems */}
            <div className={classes.topItems}>
                <div
                    onClick={(e) => {
                        isAuthenticated ? handleCardState(e) : handleClickLoginSnackBar(e)
                        e.stopPropagation()
                    }}
                    className={`${classes.favIcon} ${!cardState.isFavorited ? classes.notFav : classes.isFav}`}
                >
                    <FavoriteIcon stroke={"#3C3838"} strokeWidth={"1px"} />
                </div>
                {/* da implementare la logica per capire se il caricamento dell'immagine è finito */}
                {!image ? (
                    <Skeleton className={classes.skeleton} sx={{ bgcolor: "#C5E4C9" }} variant="rectangular" height={"100%"} />
                ) : (
                    <img className={`${classes.imageInactive} ${animateMe && classes.imageActive}`} src={image} alt="" />
                )}
            </div>

            {/* bottomItems */}
            <div className={classes.bottomItems}>
                <section className={classes.chipsWrapper}>
                    {isVegan && <FilterChip label={"Vegan"} />}
                    {isVegetarian && <FilterChip label={"Vegetarian"} />}
                    {isGlutenFree && <FilterChip label={"GlutenFree"} />}

                    {attributes &&
                        attributes.length > 0 &&
                        attributes.map((chip, index) => <FilterChip key={index} label={chip} />)}
                </section>
                {!expandedCard && <p className={classes.title}>{title}</p>}
            </div>

            {expandedCard && (
                <div className={classes.recipeBody}>
                    <ul
                        className={`${classes.ingredients} ${
                            expandedIngredients ? classes.ingredientsExpanded : classes.ingredientsCollapsed
                        }`}
                    >
                        <div onClick={(e) => handleIngWrapperState(e)} className={classes.ingredientsHeader}>
                            <h4>Ingredients</h4>
                            <ExpandLessIcon className={classes.ico} fontSize="small" />
                        </div>
                        <ul>
                            {ingredients.length > 0 &&
                                ingredients.map((ingredient, index) => {
                                    return <li key={index}>{ingredient}</li>
                                })}
                        </ul>
                    </ul>

                    <div className={classes.preparation}>
                        <h2>Preparazione</h2>
                        {preparation.length > 0 && (
                            <ol>
                                {preparation.map((steps, index) => {
                                    return (
                                        <li key={index} className={classes.step}>
                                            {steps[0]}
                                            <ul>
                                                {steps.length > 0 &&
                                                    steps.map((step, index) => {
                                                        if (index > 0) {
                                                            return (
                                                                <li key={index} className={classes.detail}>
                                                                    {step}
                                                                </li>
                                                            )
                                                        }
                                                    })}
                                            </ul>
                                        </li>
                                    )
                                })}
                            </ol>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default RecipeCard
