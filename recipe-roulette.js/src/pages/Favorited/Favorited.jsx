import recipes from "../../assets/recipes/recipes"

import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { Button } from "../../components/Buttons/Button/Button"
import { useRecipesResultsSideBar } from "../../hooks/RecipesResultsSideBar/useRecipesResultsSideBar"


import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined"
import classes from "./Favorite.module.scss"
import { IcoButton } from "../../components/Buttons/IcoButton/IcoButton"

//esempio di oggetto ricetta
// const recipe = {
//     title,
//     coverImage,
//     attributes,
//     ingredients,
//     preparation: {
//         image1,
//         paragraph1,
//         image2,
//         paragraph2,
//     }
// }
export function Favorited({handleRecipesSidebarToggle}) {
    const { animate } = useAnimate()

    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            <section className={classes.search}>
                <IngredientSearch isFixed={true}/>
                <IcoButton action={handleRecipesSidebarToggle} label="Filters" icon={<TuneOutlinedIcon fontSize="small" />} />{" "}
            </section>
            <section className={classes.recipesWrapper}>
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
            </section>
        </div>
    )
}
