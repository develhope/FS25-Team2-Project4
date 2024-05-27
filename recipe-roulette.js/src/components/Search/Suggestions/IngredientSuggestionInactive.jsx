import { MaterialSymbol } from "react-material-symbols"
import { useIngredientSuggestion } from "./useIngredientSuggestion"
import { useIngredientSearch } from "../SearchBar/useIngredientSearch"

import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestionInactive({ ing, prop = "isSelected" }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick } = useIngredientSearch()

    return (
        <>
            {ing.isBlackListed && (
                <p className={`${!ing.isSelected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
                    <MaterialSymbol icon="block" grade={20} size={20} />
                    {name}
                </p>
            )}
            {ing.isSelected && (
                <p
                    onClick={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}
                    className={`${!ing.isSelected && classes.inactiveSuggestion} ${classes.lockedSuggestion} ${classes.ingredientSuggestion}`}
                >
                    <MaterialSymbol icon="lock" weight={600} grade={20} size={20} />
                    {name}{" "}
                </p>
            )}
            {!ing.isSelected && !ing.isBlackListed && (
                <p className={`${!ing.isSelected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
                    <MaterialSymbol icon="no_meals" grade={20} size={20} />
                    {name}
                </p>
            )}
        </>
    )
}
{
    /* <p className={`${!ing.isSelected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
            {ing.isBlackListed && <MaterialSymbol icon="block" grade={20} size={20} />}
            {ing.isSelected && <MaterialSymbol icon="task_alt" grade={20} size={20} />}
            {(!ing.isSelected && !ing.isBlackListed) && <MaterialSymbol icon="instant_mix" grade={20} size={20} />}
            {name}
        </p> */
}
