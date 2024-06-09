import classes from "./BaseSearchSuggestion.module.scss"

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
        <div onMouseDown={(e) => handleSuggestionClick(e)} className={classes.suggestion}>
            <p>{title}</p>
        </div>
    )
}
