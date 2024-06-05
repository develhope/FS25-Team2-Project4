import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import classes from "./Favorite.module.scss"
import { useRecipesContext } from "../../contexts/RecipesContext"
import { BaseSearch } from "../../components/Search/BaseSearch/BaseSearch"

export function Favorited({ handleRecipesSidebarToggle }) {
    const { animate } = useAnimate()
    const {filteredRecipes } = useRecipesContext()

    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            <section className={classes.search}>
                <BaseSearch />
                <IcoButton
                    action={handleRecipesSidebarToggle}
                    label="Filters"
                    icon={<TuneOutlinedIcon fontSize="small" />}
                />{" "}
            </section>
            <section className={classes.recipesWrapper}>
                {filteredRecipes &&
                    filteredRecipes.length > 0 &&
                    filteredRecipes.map((result) => {
                        return (
                            <RecipeCard
                                recipeId={result.id}
                                key={result.id}
                                title={result.title}
                                image={result.image}
                                attributes={result.attributes}
                                isFav={result.isFavorited}
                                preparation={result.preparation}
                                ingredients={result.ingredients}
                                isGlutenFree={result.isGlutenFree}
                                isVegetarian={result.isVegetarian}
                                isVegan={result.isVegan}
                            />
                        )
                    })}
            </section>
        </div>
    )
}
