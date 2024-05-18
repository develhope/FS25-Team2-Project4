import { useManageIngredients } from "../../pages/Discovery/IngredientsContext"
import classes from "./IngredientSearch.module.scss"
import { IngredientSuggestion } from "./IngredientSuggestion"

export function IngredientSuggestions({ inputActive, searchCriteria }) {
    const { ing } = useManageIngredients()
    return (
        <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
            {ing &&
                ing
                    .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                    .map((ingredient) => {
                        if (!ingredient[searchCriteria]) {
                            return (
                                <IngredientSuggestion
                                    ing={ingredient}
                                    prop={searchCriteria}
                                    className={classes.active}
                                    key={ingredient.id}
                                />
                            )
                        } else {
                            return <IngredientSuggestion ing={ingredient} className={classes.inactive} key={ingredient.id} />
                        }
                    })}
        </div>
    )
}
