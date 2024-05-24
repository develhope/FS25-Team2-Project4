import classes from "./RecipesResults.module.scss"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { FilterChip } from "../../components/FilterChip/FilterChip"
import { useFilterChips } from "../../components/FilterChip/useFilterChip"

function RecipeResults() {
    const { handleDeselectChip } = useFilterChips()


    return (
        <div className={classes.recipesResultsPage}>
            <header>
                <h1>Results</h1>
                <button className={classes.btnFilters}>filters</button>
            </header>
            <div className={classes.subHeading}>
                <p className={classes.text}>Preparation time</p>
                <div className={classes.chipBox}>
                <FilterChip/>
                <FilterChip/>
                <FilterChip/>
            </div>
            </div>

            <div className={classes.resultsBox}>

            </div>
            <RecipeCard title="Just a title" />
            <RecipeCard title="Just another title" />
            <RecipeCard title="Just anotherother title" />
        </div>
    )
}

export default RecipeResults
