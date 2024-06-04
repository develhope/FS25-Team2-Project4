import recipesArray from "../../assets/recipes/recipes"

import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import classes from "./Favorite.module.scss"

export function Favorited({ handleRecipesSidebarToggle }) {
    const { animate } = useAnimate()

    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            <section className={classes.search}>
                <IngredientSearch isFixed={true} />
                <IcoButton
                    action={handleRecipesSidebarToggle}
                    label="Filters"
                    icon={<TuneOutlinedIcon fontSize="small" />}
                />{" "}
            </section>
            <section className={classes.recipesWrapper}>
                {recipesArray &&
                    recipesArray.length > 0 &&
                    recipesArray.map((result) => {
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
