import { MaterialSymbol } from "react-material-symbols"
import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestionInactive({ ing }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing

    return (
        <p className={`${!ing.isSelected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
            {name}
            {ing.isBlackListed && <MaterialSymbol icon="block" grade={20} size={20} />}
            {ing.isSelected && <MaterialSymbol icon="task_alt" grade={20} size={20} />}
            {(!ing.isSelected && !ing.isBlackListed) && <MaterialSymbol icon="instant_mix" grade={20} size={20} />}
        </p>
    )
}