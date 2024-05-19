import { IngredientCard } from "../IngredientCard/IngredientCard"
import { IngredientSearch } from "../IngredientCard/IngredientSearch"
import { useIngredientSearch } from "../IngredientCard/useIngredientSearch"
import classes from "./DisplayedIngredient.module.scss"

export function DisplayedIngredient() {
    const { searchState } = useIngredientSearch()

    return <div className={classes.componentWrapper}>{!searchState.inputActive ? <IngredientCard /> : <IngredientSearch />}</div>
}
