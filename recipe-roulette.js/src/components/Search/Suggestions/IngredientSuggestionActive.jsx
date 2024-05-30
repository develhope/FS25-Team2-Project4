import { useIngredientSearch } from "../SearchBar/useIngredientSearch"
import { useIngredientSuggestion } from "./useIngredientSuggestion"
import classes from "./IngredientSuggestions.module.scss"
import { MaterialSymbol } from "react-material-symbols"

export function IngredientSuggestionActive({ ing, prop }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick } = useIngredientSearch()

    return (
        <>
            {prop === "isBlackListed" && (
                <p
                    className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
                    onMouseDown={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}
                >
                    <MaterialSymbol icon="cancel" weight={400} grade={20} size={20} />
                    {name}
                </p>
            )}
            {prop === "isSelected" && (
                <p
                    className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
                    onMouseDown={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}
                >
                    <MaterialSymbol icon="lock_open" weight={400} grade={20} size={20} />
                    {name}
                </p>
            )}
        </>
    )
}
