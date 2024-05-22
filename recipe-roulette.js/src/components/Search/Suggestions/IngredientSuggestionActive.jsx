import { useIngredientSearch } from "../SearchBar/useIngredientSearch"
import { useIngredientSuggestion } from "./useIngredientSuggestion"
import classes from "./IngredientSuggestions.module.scss"
import { MaterialSymbol } from "react-material-symbols"

export function IngredientSuggestionActive({ ing, prop }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick } = useIngredientSearch()

    return (
        <p
            className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
            onClick={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}
        >
            <MaterialSymbol icon="circle" weight={400} grade={20} size={20}/>
            {name}
        </p>
    )
}
