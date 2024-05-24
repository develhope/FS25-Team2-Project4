import { useManageIngredients } from "../../../pages/Discovery/IngredientsContext"
import classes from "./IngredientSuggestions.module.scss"
import { IngredientSuggestionActive } from "./IngredientSuggestionActive"
import { IngredientSuggestionInactive } from "./IngredientSuggestionInactive"

export function IngredientSuggestions({ inputActive, searchCriteria, suggestions }) {
    const { filter } = useManageIngredients()
    const isIngredientActive = (ingredient) => {
        if (ingredient.isSelected || ingredient.isBlackListed) {
            return false
        }
        if (filter.isVegetarian && !ingredient.isVegetarian) {
            return false
        }
        if (filter.isGlutenFree && !ingredient.isGlutenFree) {
            return false
        }
        if (filter.isVegan && !ingredient.isVegan) {
            return false
        }
        return true
    }

    return (
        <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
            {suggestions &&
                suggestions
                    .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                    .map((ingredient) => {
                        if (isIngredientActive(ingredient)) {
                            return <IngredientSuggestionActive ing={ingredient} prop={searchCriteria} key={ingredient.id} />
                        } else {
                            return <IngredientSuggestionInactive ing={ingredient} key={ingredient.id} />
                        }
                    })}
        </div>
    )
}
