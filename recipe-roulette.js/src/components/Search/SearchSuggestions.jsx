import classes from "./Search.module.scss"
import { SearchSuggestion } from "./SearchSuggestion"

export function SearchSuggestions({
    array,
    handleSuggestionClick,
    inputActive,
    searchCriteria,
    prop,
}) {

    return (
        <div className={`${classes.suggestions} ${inputActive && classes.active}`}>
            {array &&
                array
                    .sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1))
                    .map((ingredient) => {
                        if (!ingredient[searchCriteria]) {
                            return (
                                <SearchSuggestion
                                    ingredient={ingredient}
                                    prop={searchCriteria}
                                    className={classes.active}
                                    onClick={(e) =>
                                        handleSuggestionClick(e, prop)
                                    }
                                    key={ingredient.id}
                                />
                            )
                        } else {
                            return (
                                <SearchSuggestion
                                    ing={ingredient}
                                    className={classes.inactive}
                                    key={ingredient.id}
                                />
                            )
                        }
                    })}
        </div>
    )
}
