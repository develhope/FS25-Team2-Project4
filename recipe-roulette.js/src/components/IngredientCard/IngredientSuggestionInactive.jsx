import classes from "./IngredientSuggestion.module.scss"

export function IngredientSuggestionInactive({ ing }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing

    return <p className={`${classes.inactive} ${classes.ingredientSuggestion}`}>{name}</p>
}
