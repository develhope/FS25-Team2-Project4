import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import classes from "./Discovery.module.scss"

function Discovery() {
    return (
        <div className={classes.ingredientsWrapper}>
            <h1>Discovery</h1>
            <IngredientCard label={"ingrediente 1"} bgColor={"#FFBE84"} />
            <IngredientCard label={"ingrediente 1"} bgColor={"#FFBE84"} />
            <IngredientCard label={"ingrediente 1"} bgColor={"#FFBE84"} />
            <IngredientCard label={"ingrediente 1"} bgColor={"#FFBE84"} />
        </div>
    )
}

export default Discovery
