import { useRecipesContext } from "../../../contexts/RecipesContext"
import classes from "./BaseSearch.module.scss"

export function BaseSearch() {
    const { inputValue, setInputValue } = useRecipesContext()

    return (
        <div className={classes.baseSearch}>
            <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" placeholder="Search a recipe" />
        </div>
    )
}
