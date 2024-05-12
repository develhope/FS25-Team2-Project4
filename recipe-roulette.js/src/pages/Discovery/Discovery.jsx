import { MaterialSymbol } from "react-material-symbols"
import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import classes from "./Discovery.module.scss"
import { useManageIngredients } from "../Discovery/IngredientsContext"

function Discovery() {
    const { randomIngredients, shuffleIngredients } = useManageIngredients()

    return (
        <div className={classes.ingredientsWrapper}>
            <h1>Discovery</h1>
            {randomIngredients &&
                randomIngredients.map((ingredient) => {
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
            <button className={classes.cycleButton} onClick={() => shuffleIngredients()}>
                {" "}
                <MaterialSymbol className={classes.ico} icon="cycle" size={24} grade={24} />
            </button>
        </div>
    )
}

export default Discovery
