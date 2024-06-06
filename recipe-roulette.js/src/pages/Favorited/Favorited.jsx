import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"

import classes from "./Favorite.module.scss"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { BaseSearch } from "../../components/Search/BaseSearch/BaseSearch"
import { useMemo } from "react"
import { Link } from "react-router-dom"

export function Favorited({ handleRecipesSidebarToggle }) {
    const { animate } = useAnimate()
    const { filteredRecipes, recipes } = useRecipesContext()

    const favoriteRecipes = useMemo(() => {
        return filteredRecipes.filter((recipe) => recipe.isFavorited)
    }, [recipes, filteredRecipes])

    console.log(favoriteRecipes)
    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            {favoriteRecipes.length > 0 ? (
                <>
                    {" "}
                    <section className={classes.search}>
                        <BaseSearch />
                        <IcoButton
                            action={handleRecipesSidebarToggle}
                            label="Filters"
                            icon={<TuneOutlinedIcon fontSize="small" />}
                        />{" "}
                    </section>
                    <section className={classes.recipesWrapper}>
                        {favoriteRecipes &&
                            favoriteRecipes.map((recipe) => {
                                return (
                                    <RecipeCard
                                        recipeId={recipe.id}
                                        key={recipe.id}
                                        title={recipe.title}
                                        image={recipe.image}
                                        attributes={recipe.attributes}
                                        isFav={recipe.isFavorited}
                                        preparation={recipe.preparation}
                                        ingredients={recipe.ingredients}
                                        isGlutenFree={recipe.isGlutenFree}
                                        isVegetarian={recipe.isVegetarian}
                                        isVegan={recipe.isVegan}
                                    />
                                )
                            })}
                    </section>
                </>
            ) : (
                <div className={classes.placeholder}>
                    <div className={classes.placeholderImage}>
                        <img src="/src/assets/images/undraw_add_notes_re_ln36.png" alt="a person pinning notes on a wall" />
                    </div>

                    <h2>
                        <span>Your Favorited list is empty!</span> <br />
                        Find and favorite your first recipe!
                    </h2>

                    <Link className={classes.cta} to={"/discovery"}>
                        <LoopOutlinedIcon />
                        <p>Start Ingredients Shuffle</p>
                    </Link>

                </div>
            )}
        </div>
    )
}
