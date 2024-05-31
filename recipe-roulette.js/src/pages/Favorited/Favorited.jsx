import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { useAnimate } from "../../hooks/animatePages/useAnimate"

import recipes from "../../assets/recipes/recipes"

import classes from "./Favorite.module.scss"

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
export function Favorited() {
    const { animate } = useAnimate()
    return (
        <div className={`${classes.favoritePage} ${animate && classes.animateFavorite}`}>
            <section></section>
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
