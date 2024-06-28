import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import { useRecipesContext } from "../../contexts/RecipesContext"
import { Snackbar } from "../../components/Snackbar/Snackbar"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useRecipesFetch } from "../../hooks/recipesFetch/useRecipesFetch"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./RecipesResults.module.scss"

export function RecipeResults() {
    const { searchFilteredRecipes } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()
    const { state } = useRecipesFetch()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${classes.recipesResultsPage} ${animate && classes.animateFavorite} `}>
            <div className={classes.subHeading}>
                <div className={classes.chipWrapper}>
                    <FilterChipRecipes filterType={"preparationTime"} label="All" />
                    <FilterChipRecipes filterType={"preparationTime"} numericValue={30} label="> 30m" />
                    <FilterChipRecipes filterType={"preparationTime"} numericValue={45} label="> 45m" />
                    <FilterChipRecipes filterType={"preparationTime"} numericValue={60} label="> 60m" />
                </div>
            </div>
            {state.loading === true ? (
                <section className={classes.recipesWrapper}>
                    {searchFilteredRecipes.map((recipe) => {
                        return (
                            <RecipeCard
                                handleClickLoginSnackBar={handleClickLoginSnackBar}
                                key={recipe.id}
                                recipe={recipe}
                            />
                        )
                    })}
                </section>
            ) : (
                <div className={classes.placeholder}>
                    <h2>
                        There is <span>no recipe</span> <br />
                        matching your search!
                    </h2>
                    <div className={classes.placeholderImage}>
                        <img src="../src/assets/images/undraw_cancel_re_pkdm 1.svg" alt="" />
                    </div>
                </div>
            )}
            <Snackbar />
        </div>
    )
}
