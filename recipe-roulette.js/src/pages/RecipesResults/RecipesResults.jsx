import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import { useRecipesContext } from "../../contexts/RecipesContext"
import { Snackbar } from "../../components/Snackbar/Snackbar"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useRecipesFetch } from "../../hooks/recipesFetch/useRecipesFetch"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./RecipesResults.module.scss"
import { BlocksShuffleThree } from "react-svg-spinners"

export function RecipeResults() {
    const { recipes } = useRecipesContext()
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
            {!state.loading ? (
                <section className={classes.recipesWrapper}>
                    {recipes.searched.map((recipe) => {
                        return <RecipeCard handleClickLoginSnackBar={handleClickLoginSnackBar} key={recipe.id} recipe={recipe} />
                    })}
                </section>
            ) : (
                <div className={classes.placeholder}>
                    <BlocksShuffleThree width={"40%"} height={"40%"}/>
                </div>
            )}
            <Snackbar />
        </div>
    )
}
