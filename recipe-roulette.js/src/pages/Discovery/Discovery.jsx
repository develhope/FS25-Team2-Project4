import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import classes from "./Discovery.module.scss"
import { useManageIngredients } from "../Discovery/IngredientsContext"
import { useEffect } from "react"
import { useIngredientCard } from "../../components/IngredientCard/useIngredientCard"

function Discovery() {
    const { randomIngredients, shuffleIngredients, ingredients } =
        useManageIngredients()

    //ordino gli ingredienti mostrati, mettendo sopra quelli selezionati e sotto quelli non selezionati
    ingredients.sort((a, b) => {
        return a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1
    })
    const randomIngredientsIds = randomIngredients.map((ingredient) => ingredient.id)

    const shownIngredients = ingredients.filter((ingredient) =>
        randomIngredientsIds.includes(ingredient.id)
    )

    return (
        <div className={classes.ingredientsWrapper}>
            <h1>Discovery</h1>
            {shownIngredients &&
                shownIngredients.map((ingredient) => {
                    console.log(ingredient.isSelected)
                    return (
                        <IngredientCard
                            id={ingredient.id}
                            key={ingredient.id}
                            label={ingredient.name}
                            bgColor={ingredient.bgColor}
                            isSelected={ingredient.isSelected}
                        />
                    )
                })}
            <button onClick={() => shuffleIngredients()}>Randomize</button>
        </div>
    )
}

export default Discovery
