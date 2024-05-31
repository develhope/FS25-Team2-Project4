import classes from "./IngredientSearch.module.scss"
import { useIngredientSearch } from "./useIngredientSearch"
import { IngredientSuggestions } from "../Suggestions/IngredientSuggestions"

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

export function IngredientSearch({ isFixed = false, searchCriteria = "isBlackListed" }) {
    const {
        suggestions,
        inputValues,
        searchState,
        fixedPosition,
        handlePressEnter,
        handleInputChange,
        handleInputActivation,
        handleBlur,
        handleXClick,
    } = useIngredientSearch(isFixed, searchCriteria)

    return (
        <div className={`${fixedPosition && classes.positionFixed} ${classes.search}`}>
            <div className={`${classes.searchBar} ${searchState.inputActive ? classes.inputActive : classes.inputInactive}`}>
                <input
                    className={classes.header}
                    onClick={handleInputActivation}
                    placeholder="Add an ingredient"
                    name="search"
                    type="text"
                    onBlur={(e) =>
                        setTimeout(() => {
                            handleBlur(e)
                        }, 0)
                    }
                    onKeyDown={handlePressEnter}
                    onChange={handleInputChange}
                    value={inputValues.current}
                />
                {!searchState.inputActive && (
                    <div className={`${classes.ico} ${classes.searchIco}`}>
                        <SearchOutlinedIcon fontSize="small" />
                    </div>
                )}

                {searchState.inputActive && (
                    <div onClick={(e) => handleXClick(e)} className={`${classes.ico} ${classes.closeIco}`}>
                        <CloseOutlinedIcon fontSize="small"/>
                    </div>
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
