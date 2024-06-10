import classes from "./BaseSearchSuggestion.module.scss"

export function BaseSearchSuggestion({inputRef= null, handleBlur = null, title = "", setInputValue }) {
    function handleSuggestionClick(e) {
        e.preventDefault()
        e.stopPropagation()
        setInputValue(title)
        handleBlur(e)
        inputRef.current.blur()
    }
    return (
        <div onMouseDown={(e) => handleSuggestionClick(e)} className={classes.suggestion}>
            <p>{title}</p>
        </div>
    )
}
