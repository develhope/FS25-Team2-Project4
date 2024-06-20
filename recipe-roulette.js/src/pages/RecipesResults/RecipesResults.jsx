import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import { useRecipesContext } from "../../contexts/RecipesContext"
import { Snackbar } from "../../components/Snackbar/Snackbar"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./RecipesResults.module.scss"

export function RecipeResults() {
    const { searchFilteredRecipes } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()

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
            {searchFilteredRecipes && searchFilteredRecipes.length > 0 ? (
                <section className={classes.recipesWrapper}>
                    {searchFilteredRecipes.map((recipe) => {
                        return (
                            <RecipeCard
                                handleClickLoginSnackBar={handleClickLoginSnackBar}
                                key={recipe.id}
                                recipeId={recipe.id}
                                title={recipe.title}
                                attributes={recipe.attributes}
                                isFav={recipe.isFavorited}
                                preparation={recipe.preparation}
                                ingredients={recipe.ingQuantities}
                                isGlutenFree={recipe.isGlutenFree}
                                isVegetarian={recipe.isVegetarian}
                                isVegan={recipe.isVegan}
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
