import RecipeCard from "../../components/RecipeCard/RecipeCard"

import { useSnackbar } from "../../components/Snackbar/useSnackbar"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { useLocationHook } from "../../hooks/useLocationHook"

import classes from "./Recipe.module.scss"

export function Recipe() {
    const { recipes } = useRecipesContext()
    const { handleClickLoginSnackBar } = useSnackbar()

    const { location } = useLocationHook()
    const { animate } = useAnimate(location)

    return (
        <div className={`${classes.recipePage} ${animate && classes.animateRecipePage}`}>
            {recipes.targetedRecipe && (
                <RecipeCard
                    isExpanded={true}
                    handleClickLoginSnackBar={handleClickLoginSnackBar}
                    recipe={recipes.targetedRecipe}
                />
            )}

        </div>
    )
}
