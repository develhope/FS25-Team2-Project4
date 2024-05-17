import classes from "./Search.module.scss"

export function SearchSuggestions ({array, handleSuggestionClick , inputActive, searchCriteria, callback}) {
   
   return (
        <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
{array &&
    array
        .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
        .map((ingredient) => {
            if (!ingredient[searchCriteria]) {
                return (
                    <p
                        className={classes.active}
                        onClick={(e) => handleSuggestionClick(e, ingredient.id, callback)}
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
