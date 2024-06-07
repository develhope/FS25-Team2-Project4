import classes from "./BaseSearchSuggestion.module.scss"
import { useBaseSearch } from "./useBaseSearch"

export function BaseSearchSuggestion({ handleBlur = null, title = "", setInputValue }) {
    function handleSuggestionClick(e) {
        e.preventDefault()
        e.stopPropagation()
        setInputValue(title)
        if (handleBlur) {
            console.log("i blur")
            handleBlur(e)
        }
    }
    return (
        <div onClick={(e) => handleSuggestionClick(e)} className={classes.suggestion}>
            <p>{title}</p>
        </div>
    )
}
