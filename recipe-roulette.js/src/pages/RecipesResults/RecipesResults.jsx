import classes from "./RecipesResults.module.scss"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
/* import { useDiscoverySidebar } from "../../hooks/DiscoverySidebar/useDiscoverySidebar"; */
import { FilterChipRecipes } from "../../components/FilterChip/FilterChipRecipes"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import recipes from "../../assets/recipes/recipes"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"


export function RecipeResults({handleRecipesSidebarToggle}) {
    /*   const { handleSidebarToggle, sidebarState } = useDiscoverySidebar() */
    const { animate } = useAnimate()

    return (
        <div className={`${classes.recipesResultsPage} ${animate && classes.animateFavorite} `}>
            <section className={classes.search}>
                <IngredientSearch isFixed={true} />
                <IcoButton
                    action={handleRecipesSidebarToggle}
                    label="Filters"
                    icon={<TuneOutlinedIcon fontSize="small" />}
                />{" "}
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
