import { useRecipesContext } from "../../../contexts/RecipesContext"
import { useBaseSearch } from "./useBaseSearch"
import classes from "./BaseSearch.module.scss"

export function BaseSearch() {
    const { inputValue, setInputValue } = useRecipesContext()
    const { handleBlur, handlePressEnter, handleInputActivation, isFocused } = useBaseSearch()

    return (
        <div className={`${classes.baseSearch} ${isFocused && classes.baseSearchActive}`}>
            <input
                onKeyDown={(e) => handlePressEnter(e)}
                onClick={handleInputActivation}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="text"
                placeholder="Search a recipe"
            />
        </div>
    )
}
