import classes from "../IngredientCard.module.scss"

export function InputSuggestions({suggestions, handleSuggestionClick, displayedIngredients}) {
    return (
        <div className={classes.autocompleteSuggestions}>
{suggestions && displayedIngredients &&
    suggestions
        .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
        .map((ingredient) => {
            if (!ingredient.isSelected && !displayedIngredients.some((displayed) => displayed.id === ingredient.id)) {
                return (
                    <p
                        className={classes.active}
                        onClick={(e) => handleSuggestionClick(e, ingredient.id)}
                        key={ingredient.id}
                    >
                        {ingredient.name}
                    </p>
                );
            } else {
                return (
                    <p className={classes.inactive} key={ingredient.id}>
                        {ingredient.name}
                    </p>
                );
            }
        })}
        </div>
    )
}
