import { MaterialSymbol } from "react-material-symbols"
import classes from "./IngredientSearch.module.scss"
import { useIngredientSearch } from "./useIngredientSearch"
import { IngredientSuggestions } from "../Suggestions/IngredientSuggestions"

export function IngredientSearch({ isFixed = false, searchCriteria = "isBlackListed" }) {
    const {
        suggestions,
        inputValues,
        searchState,
        fixedPosition,
        handlePressEnter,
        handleInputChange,
        handleInputActivation,
        handleInputDeactivation,
        handleXClick,
    } = useIngredientSearch(isFixed)

    return (
        <div className={`${fixedPosition && classes.positionFixed} ${classes.search}`}>
            <div className={`${classes.searchBar} ${searchState.inputActive ? classes.inputActive : classes.inputInactive}`}>
                <input
                    className={classes.header}
                    onClick={handleInputActivation}
                    placeholder="Search an ingredient"
                    name="search"
                    type="text"
                    onBlur={(e) =>
                        setTimeout(() => {
                            handleInputDeactivation(e, searchCriteria)
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
                inputActive={searchState.inputActive}
                searchCriteria={searchCriteria}
                suggestions={suggestions}
            />
        </div>
    )
}
