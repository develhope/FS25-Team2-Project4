import { useIngredientSuggestion } from "./useIngredientSuggestion"
import { useIngredientSearch } from "../SearchBar/useIngredientSearch"

import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NoMealsOutlinedIcon from '@mui/icons-material/NoMealsOutlined';

import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestionInactive({ ing, prop = "isSelected" }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing
    const { ingState, setIngState } = useIngredientSuggestion(id, name, bgColor, isSelected, isBlackListed)
    const { handleSuggestionClick } = useIngredientSearch()

    return (
        <>
            {ing.isBlackListed && (
                <p className={`${!ing.isSelected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
                    <BlockOutlinedIcon fontSize="small" />
                    {name}
                </p>
            )}
            {ing.isSelected && (
                <p
                onMouseDown={(e) => handleSuggestionClick(e, prop, ingState, setIngState)}
                    className={`${!ing.isSelected && classes.inactiveSuggestion} ${classes.lockedSuggestion} ${classes.ingredientSuggestion}`}
                >
                    <LockOutlinedIcon fontSize="small" />
                    {name}{" "}
                </p>
            )}
            {!ing.isSelected && !ing.isBlackListed && (
                <p className={`${!ing.isSelected && classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>
                    <NoMealsOutlinedIcon fontSize="small" />
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
