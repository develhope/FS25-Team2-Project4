import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import recipesArray from "../../assets/recipes/recipes"
import classes from "./RecipesResults.module.scss"

export function RecipeResults({ handleRecipesSidebarToggle }) {
    const { animate } = useAnimate()

    return (
        <div className={`${classes.recipesResultsPage} ${animate && classes.animateFavorite} `}>
            <section className={classes.search}>
                <IngredientSearch isFixed={true} />
                <IcoButton action={handleRecipesSidebarToggle} label="Filters" icon={<TuneOutlinedIcon fontSize="small" />} />
            </section>
            <div className={classes.subHeading}>
                <div className={classes.chipWrapper}>
                    <FilterChipRecipes label="All" />
                    <FilterChipRecipes label="30m" />
                    <FilterChipRecipes label="45m" />
                    <FilterChipRecipes label="60m +" />
                </div>
            </div>

            <div className={classes.resultsWrapper}>
                {recipesArray &&
                    recipesArray.length > 0 &&
                    recipesArray.map((result) => {
                        return (
                            <RecipeCard
                                key={result.id}
                                recipeId={result.id}
                                title={result.title}
                                image={result.image}
                                attributes={result.attributes}
                                isFav={result.isFavorited}
                                preparation={result.preparation}
                                ingredients={result.ingredients}
                            />
                        )
                    })}
            </div>
        </div>
    )
}
