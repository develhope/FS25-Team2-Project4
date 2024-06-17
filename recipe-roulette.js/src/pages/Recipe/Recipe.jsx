import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { Snackbar } from "../../components/Snackbar/Snackbar"
import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./Recipe.module.scss"

export function Recipe() {
    const { targetedRecipe } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()

    const {location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${classes.recipePage} ${animate && classes.animateRecipePage}`}>
            {targetedRecipe && (
                <RecipeCard
                    handleClickLoginSnackBar={handleClickLoginSnackBar}
                    recipeId={targetedRecipe.id}
                    title={targetedRecipe.title}
                    isExpanded={true}
                    isFav={targetedRecipe.isFavorited}
                    isGlutenFree={targetedRecipe.isGlutenFree}
                    isVegetarian={targetedRecipe.isVegetarian}
                    isVegan={targetedRecipe.isVegan}
                    preparation={targetedRecipe.preparation}
                    ingredients={targetedRecipe.ingQuantities}
                    attributes={targetedRecipe.attributes}
                />
            )}
            <Snackbar />
        </div>
    )
}
