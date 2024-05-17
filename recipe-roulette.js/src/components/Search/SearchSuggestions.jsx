import classes from "./Search.module.scss"

export function SearchSuggestions ({suggestions, handleSuggestionClick , inputActive}) {

    return (
        <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
{suggestions &&
    suggestions
        .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
        .map((ingredient) => {
            if (!ingredient.isBlackListed) {
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
                )
            }
        })}
        </div>
    )
}
