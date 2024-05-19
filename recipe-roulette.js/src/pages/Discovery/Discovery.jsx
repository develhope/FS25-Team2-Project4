import { MaterialSymbol } from "react-material-symbols"
import { IngredientCard } from "../../components/IngredientCard/IngredientCard"
import { useManageIngredients } from "../Discovery/IngredientsContext"

import classes from "./Discovery.module.scss"
import { IngredientSearch } from "../../components/IngredientCard/IngredientSearch"
import { useIngredientSearch } from "../../components/IngredientCard/useIngredientSearch"
import { useEffect } from "react"

function Discovery() {
    const { displayedIng, shuffleIng, handleIngIncrement, handleDeselectAll, ingNum, selectToDisplay } = useManageIngredients()
    const { suggestions } = useIngredientSearch("isSelected")


    useEffect(() => {
        shuffleIng()
    }, [suggestions])

    return (
        <div className={classes.discoveryPage}>
            <header>
                <h1>Discovery</h1>
                <button onClick={() => handleDeselectAll("isSelected")} className={classes.button}>
                    Deselect all
                    <MaterialSymbol className={classes.ico} icon="deselect" size={18} grade={18} />
                </button>
            </header>

            <div className={classes.ingredientsWrapper}>
                <IngredientSearch searchCriteria="isSelected" />
                {displayedIng.length > 0 &&
                    displayedIng.map((ing) => {
                        return <IngredientCard key={ing.id} ing={ing} />
                    })}
            </div>
            <div className={classes.bottomButtons}>
                <button className={`${classes.button} ${ingNum === 8 && classes.disabled}`} onClick={() => handleIngIncrement()}>
                    <MaterialSymbol className={classes.ico} icon="add" size={18} grade={18} />
                    ingredient
                </button>
                <button className={classes.cycleButton} onClick={() => shuffleIng()}>
                    {" "}
                    <MaterialSymbol className={classes.ico} icon="cycle" size={18} grade={18} />
                </button>
                <button className={classes.button}>
                    <MaterialSymbol className={classes.ico} icon="done_all" size={18} grade={18} />
                    find recipes
                </button>
            </div>
        </div>
    )
}

export default Discovery
