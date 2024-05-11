import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import classes from "./Discovery.module.scss"
import { useManageIngredients } from "../Discovery/IngredientsContext"
import { useEffect } from "react"

function Discovery() {
    const { randomIngredients, shuffleIngredients, ingredients } = useManageIngredients()
    
    const randomIngredientsIds = randomIngredients.map((ingredient) => ingredient.id)
    const shownIngredients = ingredients.filter((ingredient) =>
        randomIngredientsIds.includes(ingredient.id)
    )
    return (
        <div className={classes.ingredientsWrapper}>
            <h1>Discovery</h1>
            {shownIngredients.length > 0 &&
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
