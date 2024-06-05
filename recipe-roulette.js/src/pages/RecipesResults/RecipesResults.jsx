import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import classes from "./RecipesResults.module.scss"
import { BaseSearch } from "../../components/Search/BaseSearch/BaseSearch"
import { useRecipesContext } from "../../contexts/RecipesContext"

export function RecipeResults({ handleRecipesSidebarToggle }) {
    const { animate } = useAnimate()
    const { filteredRecipes } = useRecipesContext()
    console.log(filteredRecipes);

    return (
        <div className={`${classes.recipesResultsPage} ${animate && classes.animateFavorite} `}>
            <section className={classes.search}>
                {/* <IngredientSearch isFixed={true} /> */}
                <BaseSearch data={filteredRecipes} />
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
                {filteredRecipes &&
                    filteredRecipes.length > 0 &&
                    filteredRecipes.map((result) => {
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
