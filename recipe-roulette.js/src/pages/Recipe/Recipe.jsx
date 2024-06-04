import { useNavigate } from "react-router-dom"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import classes from "./Recipe.module.scss"
import { useEffect } from "react"

export function Recipe() {
    const { targetedRecipe } = useRecipesContext()
    const { animate } = useAnimate()
    const navigate = useNavigate()

    useEffect(() => {
        if (!targetedRecipe) {
            navigate("/")
        }
    })

    return (
        <div className={`${classes.recipePage} ${animate && classes.animateRecipePage}`}>
            {targetedRecipe && (
                <RecipeCard
                    recipeId={targetedRecipe.id}
                    title={targetedRecipe.title}
                    isExpanded={true}
                    isFav={targetedRecipe.isFavorited}
                    isGlutenFree={targetedRecipe.isGlutenFree}
                    isVegetarian={targetedRecipe.isVegetarian}
                    isVegan={targetedRecipe.isVegan}
                    preparation={targetedRecipe.preparation}
                    ingredients={targetedRecipe.ingredients}
                    attributes={targetedRecipe.attributes}
                />
            )}
        </div>
    )
}
