import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import classes from "./Discovery.module.scss"
import { useRandomIngredients } from "./useRandomIngredients"

function Discovery() {
    const { randomIngredients, selectedIngredients, reselectIngredients, handleIngredientUpdate, handleIngredientSelect } =
        useRandomIngredients()
        console.log(randomIngredients);

    return (
        <div className={classes.ingredientsWrapper}>
            <h1>Discovery</h1>
            {randomIngredients.length > 0 &&
                randomIngredients.map((ingredient) => {
                    if (!ingredient.isSelected) {
                        return (
                            <IngredientCard
                                id={ingredient.id}
                                key={ingredient.id}
                                label={ingredient.name}
                                bgColor={ingredient.bgColor}
                            />
                        )
                    }
                })}
            <button onClick={() => reselectIngredients ()}>Randomize</button>
        </div>
    )
}

export default Discovery
