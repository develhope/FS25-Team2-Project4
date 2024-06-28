import { useLocation } from "react-router-dom"
import { useRecipeCard } from "./useRecipeCard"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { FilterChip } from "../FilterChip/FilterChip"
import { useAuth } from "../../hooks/Auth/useAuth"

import FavoriteIcon from "@mui/icons-material/Favorite"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import Skeleton from "@mui/material/Skeleton"

import classes from "./RecipeCard.module.scss"

function RecipeCard({ isExpanded = false, recipe, handleClickLoginSnackBar = null }) {
    const { recipeAnimation } = useRecipesContext()
    const { isAuthenticated } = useAuth()
    const location = useLocation()
    const { id, title, attributes, isFavorited, isGlutenFree, isVegetarian, isVegan, ingQuantities, preparation } = recipe
    const { handleCardState, cardState, expandedCard, expandedIngredients, handleIngWrapperState, handleOpenRecipePage } =
        useRecipeCard(recipe.id, recipe.isFavorited, isExpanded)

    const image =
        "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202312/MIT_Food-Diabetes-01_0.jpg?itok=Mp8FVJkC"
    return (
        <div
            onClick={() => {
                if (!expandedCard) {
                    localStorage.setItem("prevPath", location.pathname)
                    localStorage.setItem("targetedRecipe", JSON.stringify(recipe))
                    handleOpenRecipePage(recipe)
                }
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
                {!image ? (
                    <Skeleton className={classes.skeleton} sx={{ bgcolor: "#C5E4C9" }} variant="rectangular" height={"100%"} />
                ) : (
                    <img src={image} alt="" />
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
                            {ingQuantities.length > 0 &&
                                ingQuantities.map((ingredient, index) => {
                                    return <li key={index}>{ingredient}</li>
                                })}
                        </ul>
                    </ul>

                    <div className={classes.preparation}>
                        <h2>Preparation</h2>
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
