import { MaterialSymbol } from "react-material-symbols"
import classes from "./IngredientSearch.module.scss"
import { useIngredientSearch } from "./useIngredientSearch"
import { IngredientSuggestions } from "./IngredientSuggestions"

export function IngredientSearch({ searchCriteria = "isBlackListed" }) {
    const {
        inputValues,
        searchState,
        suggestions,
        handleSuggestionClick,
        handlePressEnter,
        handleInputChange,
        handleInputActivation,
        handleInputDeactivation,
        handleXClick,
    } = useIngredientSearch()

    return (
        <div className={classes.search}>
            
            <div className={`${classes.searchBar} ${searchState.inputActive ? classes.inputActive : classes.inputInactive}`}>
                <input
                    className={classes.header}
                    onClick={handleInputActivation}
                    placeholder="Search an ingredient"
                    name="search"
                    type="text"
                    onBlur={(e) =>
                        setTimeout(() => {
                            handleInputDeactivation(e)
                        }, 25)
                    }
                    onKeyDown={handlePressEnter}
                    onChange={handleInputChange}
                    value={inputValues.current}
                />
                {!searchState.inputActive && (
                    <MaterialSymbol
                        className={`${classes.ico} ${classes.searchIco}`}
                        icon="search"
                        weight={400}
                        size={18}
                        grade={18}
                    />
                )}

                {searchState.inputActive && (
                    <MaterialSymbol
                        onClick={(e) => handleXClick(e)}
                        className={`${classes.ico} ${classes.closeIco}`}
                        icon="close"
                        weight={400}
                        size={18}
                        grade={18}
                    />
                )}
            </div>
            <IngredientSuggestions
                array={suggestions}
                handleSuggestionClick={handleSuggestionClick}
                inputActive={searchState.inputActive}
                searchCriteria={searchCriteria}
            />
        </div>
    )
}
