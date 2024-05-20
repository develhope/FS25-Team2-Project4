import classes from "./IngredientSuggestions.module.scss"

export function IngredientSuggestionInactive({ ing }) {
    const { id, name, bgColor, isSelected, isBlackListed } = ing

    return <p className={`${classes.inactiveSuggestion} ${classes.ingredientSuggestion}`}>{name}</p>
}
