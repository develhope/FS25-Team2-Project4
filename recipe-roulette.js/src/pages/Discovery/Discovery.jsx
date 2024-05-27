import { MaterialSymbol } from "react-material-symbols"
import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { IngredientSearch } from "../../components/Search/SearchBar/IngredientSearch"
import { useManageIngredients } from "../Discovery/IngredientsContext"
import { Snackbar } from "../../components/Snackbar/Snackbar"

import classes from "./Discovery.module.scss"

export function Discovery({ handleSidebarToggle }) {
    const { displayedIng, shuffleIng, handleIngIncrement, handleDeselectAll } = useManageIngredients()
    return (
        <div className={classes.discoveryPage}>
            <div className={classes.contentWrapper}>
                <div className={classes.globalActions}>
                    <IngredientSearch isFixed={true} searchCriteria="isSelected" />
                    <button onClick={handleSidebarToggle} className={classes.icoButton}>
                        <MaterialSymbol className={classes.ico} icon="tune" size={18} grade={18} />
                    </button>
                    <button onClick={() => handleDeselectAll("isSelected")} className={classes.icoButton}>
                        <MaterialSymbol className={classes.ico} icon="rotate_left" size={18} grade={18} />
                    </button>
                </div>
                <div className={classes.ingredientsWrapper}>
                    {displayedIng.length > 0 &&
                        displayedIng.map((ing) => {
                            return <IngredientCard key={ing.id} ing={ing}/>
                        })}
                </div>
            </div>

            <div className={classes.bottomButtons}>
                <button
                    className={`${classes.button} ${displayedIng.length === 8 && classes.disabled}`}
                    onClick={() => handleIngIncrement()}
                >
                    <MaterialSymbol className={classes.ico} icon="add" size={18} grade={18} />
                    Ingredient
                </button>
                <button className={classes.cycleButton} onClick={() => shuffleIng()}>
                    {" "}
                    <MaterialSymbol className={classes.ico} icon="cycle" weight={500} size={24} grade={24} />
                </button>
                <button className={classes.button}>
                    <MaterialSymbol className={classes.ico} icon="done_all" size={18} grade={18} />
                    Find recipes
                </button>
            </div>
            <Snackbar />
        </div>
    )
}
