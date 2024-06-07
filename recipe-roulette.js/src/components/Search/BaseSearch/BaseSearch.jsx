import { useBaseSearch } from "./useBaseSearch"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"

import classes from "./BaseSearch.module.scss"
import { BaseSearchSuggestion } from "./BaseSearchSuggestion"

export function BaseSearch({ data = [], inputValue = "", setInputValue }) {
    const { handleBlur, handlePressEnter, handleInputActivation, isFocused } = useBaseSearch(setInputValue)

    return (
        <div className={`${classes.baseSearch} ${isFocused && classes.baseSearchActive}`}>
            <div className={classes.searchBar}>
                <input
                    autoComplete="off"
                    className={classes.input}
                    onKeyDown={(e) => handlePressEnter(e)}
                    onClick={handleInputActivation}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={(e) => handleBlur(e)}
                    value={inputValue}
                    type="text"
                    placeholder="Search a recipe"
                />
                <div
                    onMouseDown={(e) => {
                        if (isFocused) {
                            e.stopPropagation()
                            e.preventDefault()
                            setInputValue("")
                            handleBlur(e)
                        }
                    }}
                    className={classes.ico}
                >
                    {isFocused ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
                </div>
            </div>
            <div className={classes.suggestionsWrapper}>
                {data.map((recipe) => {
                    return (
                        <BaseSearchSuggestion
                            id={recipe.id}
                            handleBlur={handleBlur}
                            setInputValue={setInputValue}
                            title={recipe.title}
                        />
                    )
                })}
            </div>
        </div>
    )
}
