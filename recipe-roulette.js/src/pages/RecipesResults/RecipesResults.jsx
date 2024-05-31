import classes from "./RecipesResults.module.scss"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
/* import { useDiscoverySidebar } from "../../hooks/DiscoverySidebar/useDiscoverySidebar"; */
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import recipes from "../../assets/recipes/recipes"

export function RecipeResults() {
    /*   const { handleSidebarToggle, sidebarState } = useDiscoverySidebar() */
    const { animate } = useAnimate()

    return (
        <div className={`${classes.recipesResultsPage} ${animate && classes.animateFavorite} `}>
            <div className={classes.subHeading}>
                <p className={classes.text}>Preparation time</p>

                <div className={classes.chipWrapper}>
                    <FilterChipRecipes label="All" />
                    <FilterChipRecipes label="30m" />
                    <FilterChipRecipes label="45m" />
                    <FilterChipRecipes label="60m +" />
                </div>
            </div>

            <div className={classes.resultsWrapper}>
                {recipes &&
                    recipes.length > 0 &&
                    recipes.map((result) => {
                        return (
                            <RecipeCard
                                key={result.id}
                                title={result.title}
                                image={result.image}
                                attributes={result.attributes}
                                isFav={result.isFavorited}
                            />
                        )
                    })}
            </div>
        </div>
    )
}
