import { MaterialSymbol } from "react-material-symbols"
import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestionInactive({ ing }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing

    return (
        <p className={`${classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
            {name}
            {ing.isBlackListed && <MaterialSymbol icon="block" grade={18} size={18} />}
            {ing.isSelected && <MaterialSymbol icon="check_circle" grade={18} size={18} />}
        </p>
    )
}
