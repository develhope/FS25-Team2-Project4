import { useBaseSearch } from "./useBaseSearch"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"

import classes from "./BaseSearch.module.scss"

export function BaseSearch({ inputValue = "", setInputValue }) {
    const { handleBlur, handlePressEnter, handleInputActivation, isFocused } = useBaseSearch()

    return (
        <div className={`${classes.baseSearch} ${isFocused && classes.baseSearchActive}`}>
            <input
                onKeyDown={(e) => handlePressEnter(e)}
                onClick={handleInputActivation}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                placeholder="Search a recipe"
            />
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setInputValue("")
                        handleBlur(e)
                }}
                className={classes.ico}
            >
                {isFocused ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
            </div>
        </div>
    )
}
