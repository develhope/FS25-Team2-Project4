import classes from "./RecipesResults.module.scss"
import RecipeCard from "../../components/RecipeCard/RecipeCard"

function RecipeResults() {
    return (
        <div className={classes.recipesResultsPage}>
            <h1>Recipe Results</h1>
            <RecipeCard title="Just a title" />
            <RecipeCard title="Just another title" />
            <RecipeCard title="Just anotherother title" />
        </div>
    )
}

export default RecipeResults
