import { useIngredientSearch } from "../SearchBar/useIngredientSearch"
import { useIngredientSuggestion } from "./useIngredientSuggestion"

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import classes from "./IngredientSuggestions.module.scss"

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
                    <CancelOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
            {prop === "isSelected" && (
                <p
                    className={`${classes.activeSuggestion} ${classes.ingredientSuggestion}`}
                    onMouseDown={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}
                >
                    <LockOpenOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
        </>
    )
}
